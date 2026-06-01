export default async function handler(req, res) {
    // 1. Configurar Headers de CORS (Por seguridad y para que Vercel responda bien)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Manejar la petición de preflight de CORS (OPTIONS)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Solo aceptamos peticiones POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido. Usar POST.' });
    }

    const { codigo } = req.body;

    if (!codigo) {
        return res.status(400).json({ error: 'Falta ingresar el código.' });
    }

// 2. CONFIGURACIÓN DE SUPABASE (Variables de entorno seguras)
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    try {
        // --- CONSULTA 1: SELECT (Buscar si el código existe y está libre) ---
        const urlFetch = `${SUPABASE_URL}/rest/v1/entradas?codigo=eq.${encodeURIComponent(codigo)}&select=*`;
        
        const responseSelect = await fetch(urlFetch, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!responseSelect.ok) {
            throw new Error('Error al conectar con el servidor de base de datos.');
        }

        const data = await responseSelect.json();

        // Si el array vuelve vacío, el código de SQL no devolvió filas (No existe)
        if (data.length === 0) {
            return res.status(404).json({ valido: false, mensaje: 'El código ingresado no es válido.' });
        }

        const registro = data[0];

        // Verificamos si ya fue quemado por otra persona
        if (registro.usado === true) {
            return res.status(400).json({ valido: false, mensaje: 'Este código ya fue utilizado en otro dispositivo.' });
        }

        // --- CONSULTA 2: UPDATE (Quemar el código en tiempo real) ---
        const urlUpdate = `${SUPABASE_URL}/rest/v1/entradas?id=eq.${registro.id}`;
        const timestampAhora = new Date().toISOString();

        const responseUpdate = await fetch(urlUpdate, {
            method: 'PATCH', // PATCH equivale al UPDATE en las APIs RESTful de Supabase
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation' // Le pide a Supabase que confirme la fila afectada
            },
            body: JSON.stringify({
                usado: true,
                usado_en: timestampAhora
            })
        });

        if (!responseUpdate.ok) {
            throw new Error('Error al intentar dar de baja el código.');
        }

        // Si pasamos todos los filtros con éxito:
        return res.status(200).json({ 
            valido: true, 
            mensaje: 'Acceso concedido con éxito. ¡A disfrutar del partido!' 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor.', detalle: error.message });
    }
}
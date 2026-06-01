export default async function handler(req, res) {
    // Headers de CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' });

    const { codigo } = req.body;
    if (!codigo) return res.status(400).json({ error: 'Falta ingresar el código.' });

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; 

    try {
        // 1. SELECT: Buscamos si el código existe y su estado es 'libre' o 'reservado'
        // PostgREST usa "in.(libre,reservado)" para emular el IN de SQL
        const urlFetch = `${SUPABASE_URL}/rest/v1/entradas?codigo=eq.${encodeURIComponent(codigo)}&estado=in.(libre,reservado)&select=*`;
        
        const responseSelect = await fetch(urlFetch, {
            method: 'GET',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });

        const data = await responseSelect.json();

        // Si el array vuelve vacío, el código no existe o ya está 'usado'
        if (data.length === 0) {
            return res.status(404).json({ valido: false, mensaje: 'El código ingresado no es válido o ya fue utilizado en otro dispositivo.' });
        }

        const registro = data[0];

        // 2. UPDATE: Quemamos el código pasándolo a 'usado' y guardando el timestamp
        const urlUpdate = `${SUPABASE_URL}/rest/v1/entradas?id=eq.${registro.id}`;
        const timestampAhora = new Date().toISOString();

        const responseUpdate = await fetch(urlUpdate, {
            method: 'PATCH',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                estado: 'usado', // 👈 Se quema definitivamente
                usado_en: timestampAhora
            })
        });

        if (!responseUpdate.ok) throw new Error('Error al dar de baja el código.');

        return res.status(200).json({ 
            valido: true, 
            mensaje: 'Acceso concedido con éxito. ¡A disfrutar del partido!' 
        });

    } catch (error) {
        return res.status(500).json({ error: 'Error interno.', detalle: error.message });
    }
}
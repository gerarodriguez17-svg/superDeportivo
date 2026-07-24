export default async function handler(req, res) {
    // 1. Cabeceras CORS obligatorias
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // 2. Responder 200 inmediatamente a OPTIONS (preflight CORS)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 3. Si por algún motivo entra un GET o POST, los procesamos ambos para evitar el 405
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
        return res.status(500).json({ 
            error: 'Faltan variables de entorno SUPABASE_URL o SUPABASE_KEY en Vercel.' 
        });
    }

    try {
        // 1. SELECT: Buscamos un código libre
        const urlGet = `${SUPABASE_URL}/rest/v1/entradas?estado=eq.libre&limit=1`;
        const responseGet = await fetch(urlGet, {
            method: 'GET',
            headers: { 
                'apikey': SUPABASE_KEY, 
                'Authorization': `Bearer ${SUPABASE_KEY}` 
            }
        });

        if (!responseGet.ok) {
            const errText = await responseGet.text();
            throw new Error(`Error en Supabase GET: ${errText}`);
        }

        const entradasLibres = await responseGet.json();

        if (!entradasLibres || entradasLibres.length === 0) {
            return res.status(404).json({ error: '¡Se agotaron las entradas!' });
        }

        const entradaAsignada = entradasLibres[0];

        // 2. UPDATE: Lo pasamos a 'reservado'
        const urlPatch = `${SUPABASE_URL}/rest/v1/entradas?id=eq.${entradaAsignada.id}`;
        const responsePatch = await fetch(urlPatch, {
            method: 'PATCH',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ 
                estado: 'reservado',
                reservado_en: new Date().toISOString() 
            })
        });

        if (!responsePatch.ok) {
            const errText = await responsePatch.text();
            throw new Error(`Error al reservar en Supabase: ${errText}`);
        }

        // 3. Devolvemos el código
        return res.status(200).json({ codigo: entradaAsignada.codigo });

    } catch (error) {
        console.error("Error backend:", error);
        return res.status(500).json({ error: 'Error en el servidor.', detalle: error.message });
    }
}
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    try {
        // 1. SELECT: Buscamos un código que esté estrictamente 'libre'
        const urlGet = `${SUPABASE_URL}/rest/v1/entradas?estado=eq.libre&limit=1`;
        const responseGet = await fetch(urlGet, {
            method: 'GET',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });

        const entradasLibres = await responseGet.json();

        if (entradasLibres.length === 0) {
            return res.status(404).json({ error: '¡Se agotaron las entradas!' });
        }

        const entradaAsignada = entradasLibres[0];

        // 2. UPDATE: Lo pasamos a 'reservado' para que nadie más lo reciba en su pantalla
        const urlPatch = `${SUPABASE_URL}/rest/v1/entradas?id=eq.${entradaAsignada.id}`;
        const responsePatch = await fetch(urlPatch, {
            method: 'PATCH',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado: 'reservado' }) // 👈 Cambia a reservado
        });

        if (!responsePatch.ok) throw new Error('Error al reservar el código.');

        // 3. Devolvemos el código para que se muestre en exito.html
        return res.status(200).json({ codigo: entradaAsignada.codigo });

    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor.', detalle: error.message });
    }
}
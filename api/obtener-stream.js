export default async function handler(req, res) {
    // Configuración de cabeceras CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
    const API_TOKEN = process.env.CLOUDFLARE_STREAM_API_TOKEN;
    const LIVE_INPUT_ID = "407942320be38f97de9277fc37d3d08c"; // ID de tu Live Input "PREUBA-SABADO"

    if (!ACCOUNT_ID || !API_TOKEN) {
        return res.status(500).json({ error: 'Faltan las credenciales de Cloudflare en el servidor.' });
    }

    try {
        // Pedimos a Cloudflare un Token Firmado válido por 6 horas (21600 segundos)
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/stream/live_inputs/${LIVE_INPUT_ID}/token`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 21600 })
            }
        );

        const data = await response.json();

        if (!data.success) {
            console.error("Error devuelto por Cloudflare:", data.errors);
            return res.status(400).json({ error: 'No se pudo generar el token de seguridad.' });
        }

        const tokenFirmado = data.result.token;
        
        // Armamos la URL firmada
        const streamUrl = `https://customer-s9j2d2h307gul2fy.cloudflarestream.com/${tokenFirmado}/manifest/video.m3u8`;

        return res.status(200).json({ streamUrl });

    } catch (error) {
        console.error("Error al firmar Stream:", error);
        return res.status(500).json({ error: 'Error de conexión al autorizar la señal.' });
    }
}
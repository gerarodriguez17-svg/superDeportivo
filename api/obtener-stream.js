export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
    const API_TOKEN = process.env.CLOUDFLARE_STREAM_API_TOKEN;
    const LIVE_INPUT_ID = "407942320be38f97de9277fc37d3d08c";

    if (!ACCOUNT_ID || !API_TOKEN) {
        return res.status(500).json({ 
            error: 'Faltan las credenciales.',
            debug: { tieneAccountId: !!ACCOUNT_ID, tieneApiToken: !!API_TOKEN }
        });
    }

    try {
        // Petición de token para Live Input
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/stream/live_inputs/${LIVE_INPUT_ID}/token`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    exp: Math.floor(Date.now() / 1000) + 21600
                })
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            console.error("Detalle error Cloudflare:", data);
            return res.status(response.status || 400).json({ 
                error: 'Error devuelto por Cloudflare', 
                detalles: data.errors || data 
            });
        }

        const tokenFirmado = data.result.token;
        const streamUrl = `https://customer-s9j2d2h307gul2fy.cloudflarestream.com/${tokenFirmado}/manifest/video.m3u8`;

        return res.status(200).json({ streamUrl });

    } catch (error) {
        return res.status(500).json({ error: 'Error de conexión.', mensaje: error.message });
    }
}
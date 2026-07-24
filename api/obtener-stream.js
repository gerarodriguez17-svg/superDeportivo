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
            error: 'Faltan credenciales.',
            tieneAccountId: !!ACCOUNT_ID, 
            tieneApiToken: !!API_TOKEN 
        });
    }

    try {
        // Petición a Cloudflare Stream API
        const urlCloudflare = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/stream/live_inputs/${LIVE_INPUT_ID}/token`;
        
        const response = await fetch(urlCloudflare, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                exp: Math.floor(Date.now() / 1000) + 21600 // Válido por 6 horas
            })
        });

        // Leemos como texto primero para evitar el choque de JSON parser si Cloudflare envía un html/error
        const textData = await response.text();
        
        let data;
        try {
            data = JSON.parse(textData);
        } catch (e) {
            return res.status(500).json({ 
                error: 'Respuesta no válida de Cloudflare', 
                respuestaRaw: textData 
            });
        }

        if (!response.ok || !data.success) {
            return res.status(response.status || 400).json({ 
                error: 'Cloudflare rechazó la solicitud de token', 
                detalles: data.errors || data 
            });
        }

        const tokenFirmado = data.result.token;
        const streamUrl = `https://customer-s9j2d2h307gul2fy.cloudflarestream.com/${tokenFirmado}/manifest/video.m3u8`;

        return res.status(200).json({ streamUrl });

    } catch (error) {
        return res.status(500).json({ error: 'Error interno en el servidor.', detalle: error.message });
    }
}
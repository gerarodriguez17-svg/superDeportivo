// api/webhook-mp.js
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Configuración segura de Firebase Admin para Backend
const firebaseConfig = {
    credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}
const db = getFirestore();
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

export default async function handler(req, res) {
    // Mercado Pago envía los webhooks por método POST
    if (req.method !== 'POST') return res.status(405).end();

    const { query } = req;
    
    // Validamos que sea una notificación de un pago aprobado
    if (query.topic === 'payment' || query.type === 'payment') {
        try {
            const paymentId = query.id || query['data.id'];
            const payment = new Payment(client);
            const paymentData = await payment.get({ id: paymentId });

            // Si el pago está aprobado, extraemos la metadata que guardamos en el Paso 2
            if (paymentData.status === 'approved') {
                const { user_email, match_id } = paymentData.metadata;

                // Guardamos en Firestore el registro de acceso aprobado
                await db.collection('accesos_payperview').doc(`${user_email}_${match_id}`).set({
                    email: user_email,
                    matchId: match_id,
                    fechaPago: new Date().toISOString(),
                    paymentId: paymentId,
                    estado: 'activo'
                });

                console.log(`¡Acceso concedido para ${user_email} al partido ${match_id}!`);
            }
        } catch (error) {
            console.error("Error procesando Webhook de MP:", error);
            return res.status(500).json({ message: "Error interno" });
        }
    }

    // Siempre devolvemos 200 a Mercado Pago para avisar que recibimos la notificación
    return res.status(200).send('OK');
}
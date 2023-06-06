import nodemailer from 'nodemailer';
import { join } from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body;

        // Obtiene la URL del host y la URL de referencia
        const host = req.headers.host;
        const referer = req.headers.referer;

        // Configura el transporte de correo electrónico
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        try {
            // Ruta al logotipo de la empresa
            const logoPath = join(process.cwd(), 'public', 'logo.png');

            // Envía el correo electrónico
            await transporter.sendMail({
                from: 'Julian <julianbattaglino@gmail.com>',
                to: email,
                subject: 'Nuevo mensaje de contacto',
                html: `
          <h3>Información de contacto:</h3>
          <p>Nombre: ${name}</p>
          <p>Correo electrónico: ${email}</p>
          <p>Mensaje: ${message}</p>
          <p>URL del host: ${host}</p>
          <p>URL de referencia: ${referer}</p>
          <img src="cid:logo" alt="Logo" width="100">
        `,
                attachments: [{
                    filename: 'logo.png',
                    path: logoPath,
                    cid: 'logo'
                }]
            });

            res.status(200).json({ message: 'Correo electrónico enviado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al enviar el correo electrónico' });
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}
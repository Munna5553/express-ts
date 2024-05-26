import { createTransport } from "nodemailer";

export const transporter = createTransport({
    service: process.env.MAILER_SERVICE,
    host: process.env.MAILER_HOST,
    port: Number(process.env.MAILER_PORT),
    secure: true,
    auth: {
        user: process.env.MAILER_USERNAME!,
        pass: process.env.MAILER_PASSWORD!
    }
});
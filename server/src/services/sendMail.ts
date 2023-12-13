import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';

async function createNewUser(to: string): Promise<void> {
	try {
		const config = await mailConfig();
		const transporter = nodemailer.createTransport(config);

		const info = await transporter.sendMail({
			from: 'domap22290@ustorp.com',
			to: to,
			subject: 'Conta criada no Stens;Calculator',
			text: `Conta criada com sucesso.\n\nAcesse o aplicativo `,
			html: `<h1>Conta criada com sucesso.</h1><p>Acesse o aplicativo.</p>`
		});

		if (process.env.NODE_ENV === 'development') {
			console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
		}
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error('Error sending email:', err);
		} else {
			console.error('Unexpected error type during email sending:', err);
		}
	}
}

export default createNewUser;

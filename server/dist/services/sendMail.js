var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';
function createNewUser(to) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = yield mailConfig();
            const transporter = nodemailer.createTransport(config);
            const info = yield transporter.sendMail({
                from: 'domap22290@ustorp.com',
                to: to,
                subject: 'Conta criada no Stens;Calculator',
                text: `Conta criada com sucesso.\n\nAcesse o aplicativo `,
                html: `<h1>Conta criada com sucesso.</h1><p>Acesse o aplicativo.</p>`
            });
            if (process.env.NODE_ENV === 'development') {
                console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
            }
        }
        catch (err) {
            if (err instanceof Error) {
                console.error('Error sending email:', err);
            }
            else {
                console.error('Unexpected error type during email sending:', err);
            }
        }
    });
}
export default createNewUser;

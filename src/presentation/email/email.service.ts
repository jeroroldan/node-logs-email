
import nodemailer from 'nodemailer'
import { envs } from '../../config/envs.plugin';

interface SendEmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  //TODO: attachment
}


export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MIALER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET
    }
  })

  async sendEmail(options: SendEmailOptions):Promise<boolean>{
    const { to, subject, htmlBody } = options;
    try {
      const sendInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody
      });
      return true;
    } catch (error) {
      return false;
    }
  }


}
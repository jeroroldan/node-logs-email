
import nodemailer from 'nodemailer'
import { envs } from '../../config/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];

}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {

  constructor(){}

  private transporter = nodemailer.createTransport({
    service: envs.MIALER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET
    }
  })

  async sendEmail(options: SendEmailOptions):Promise<boolean>{
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sendInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments: attachments
      });

      const log = new LogEntity({
        level: LogSeverityLevel.LOW,
        message:'Email sent',
        origin:'email.service.ts',
      });

    

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.HIGH,
        message: "Email not sent",
        origin: "email.service.ts",
      });

    
      return false;
    }
  }


  sendEmailWithFileSystemLogs(to: string | string[]){
    const subject = 'Logs del servidor';
    const htmlBody = `
      <h2>Log de sistema-NOC </h2>
        <p>Las contraseñas de las aplicaciones son menos seguras que las de las aplicaciones y los servicios actualizados que utilizan estándares de seguridad modernos. Antes de crear una contraseña para una aplicación, debes com</p>
        <p>Ver log adjuntos</p>
    `;

    const attachments:Attachment[] = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-high.log', path: './logs/logs-all.log' },
      { filename: 'logs-medium.log', path: './logs/logs-all.log' }
    ];

    return this.sendEmail({
      to,subject,attachments,htmlBody
    });
  }


}
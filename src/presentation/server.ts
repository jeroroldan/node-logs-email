import { envs } from "../config/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class Server {
  public static start(){
    const emailService = new EmailService();
    emailService.sendEmail({
      to: "jeronimoroldan12@gmail.com",
      subject: "log de sistema",
      htmlBody: `
        <h2>Log de sistema-NOC </h2>
        <p>Las contraseñas de las aplicaciones son menos seguras que las de las aplicaciones y los servicios actualizados que utilizan estándares de seguridad modernos. Antes de crear una contraseña para una aplicación, debes com</p>
        <p>Ver log adjuntos</p>
      `,
    });
    // CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log('success'),
    //     (error) => console.log(error) 
    //   ).execute("https://google.com");
    //   // new CheckService().execute("http://localhost:3000");
    // });
  }
}
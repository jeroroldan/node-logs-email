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
    // emailService.sendEmailWithFileSystemLogs(
    //   ['jeronimoroldan12@gmail.com']
    // );
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
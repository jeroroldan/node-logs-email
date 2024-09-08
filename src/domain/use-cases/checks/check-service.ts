import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface CheckServiceInterface {
  execute(url: string) : Promise<boolean>
}

type SuccessCallback = () => void;
type ErrorCallback = ( err:string ) => void;


export class CheckService implements CheckServiceInterface {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback:ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) throw new Error(`Error on check service ${url}`);
      const log = new LogEntity({message:`Service ${ url } working`, level:LogSeverityLevel.LOW, origin: 'check-service.ts'});
      this.logRepository.saveLog(log);
      this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${ url } is not ok. ${ error }`
      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.LOW,
        origin: 'check-service.ts',
      });
      this.logRepository.saveLog(log);
      this.errorCallback(errorMessage)
      return false;
    }
  }
}
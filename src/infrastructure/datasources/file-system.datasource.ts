import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDatasource {

  private readonly logPath = 'logs/';
  private readonly allLogPaths = 'logs/logs-all.log';
  private readonly mediumLogPath = 'logs/logs-medium.log';
  private readonly highLogPath = 'logs/logs-high.log';

  constructor(){
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if(!fs.existsSync( this.logPath )){
      fs.mkdirSync(this.logPath)
    }
    [ this.allLogPaths, this.mediumLogPath , this.highLogPath ].forEach(path => {
      if(fs.existsSync(path)) return
      fs.writeFileSync(path, '')
  
    })
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;
    fs.appendFileSync( this.allLogPaths, logAsJson );
    if(newLog.level === LogSeverityLevel.LOW) return;
    if(newLog.level === LogSeverityLevel.MEDIUM) {
      fs.appendFileSync(this.mediumLogPath, logAsJson);
    }else {
      fs.appendFileSync(this.highLogPath, logAsJson);
    }
  }

  private getLogsFromFile = (path: string): LogEntity[]  => {
    const content = fs.readFileSync(path, 'utf-8');
    const logs = content.split('\n').map(LogEntity.fromJson);

    return logs;

  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    
    switch(severityLevel) {

      case LogSeverityLevel.LOW:
        return this.getLogsFromFile(this.allLogPaths);

      case LogSeverityLevel.MEDIUM:
        return this.getLogsFromFile(this.mediumLogPath);

      case LogSeverityLevel.HIGH:
        return this.getLogsFromFile(this.highLogPath);

      default: 
        throw new Error(`${severityLevel} not implemented`);
    }

  }


}
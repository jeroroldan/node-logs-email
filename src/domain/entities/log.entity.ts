export enum LogSeverityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}


export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity{

  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor( options:LogEntityOptions ){
    const { level , origin , createdAt = new Date() ,  message } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = (json:string):LogEntity => {
    const { message, level , createdAt, origin } = JSON.parse(json);

    if(!message) throw new Error(message + 'is requierre');

    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin
    });
  
    return log;

  }

}


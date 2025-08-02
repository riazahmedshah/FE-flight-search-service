export class AppError extends Error{
  name:string;
  statusCode:number;
  message:string;
  details?:string;

  constructor(statusCode:number,message:string, details?:string){
    super()
    this.name = "APP_ERROR"
    this.statusCode = statusCode
    this.message = message
    this.details = details
  }
}
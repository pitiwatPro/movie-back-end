import { HttpException } from '@nestjs/common';

export class AppError extends HttpException {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly context?: any;
  public cause: any;

  constructor(
    statusCode: number,
    message: string,
    errorCode: string,
    cause: any,
  ) {
    super(message, statusCode);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.cause = cause;
  }
}

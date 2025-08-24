import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppError } from '../errors/base.error';
import { AppHttpErrorResponse } from '../helpers/http';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const timestamp = new Date().toISOString();
    const requestUrl = request.url;
    const method = request.method;
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof AppError) {
      statusCode = exception.statusCode;
      message = exception.message;
      errorCode = exception.errorCode;
    }

    console.error(exception, {
      timestamp,
      method,
      requestUrl,
    });

    const errorResponse: AppHttpErrorResponse = {
      statusCode,
      timestamp,
      path: requestUrl,
      message,
      errorCode,
    };

    response.status(statusCode).json({
      data: null,
      error: errorResponse,
    });
  }
}

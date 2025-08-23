import { ApiProperty } from '@nestjs/swagger';
import { AppError } from '../errors/base.error';
import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { InternalServerErrorHttp } from '../errors/internal-server.error';

export interface AppHttpResponse<T> {
  data: T;
  error: AppHttpErrorResponse | null;
}

export interface AppHttpErrorResponse {
  statusCode: number;
  message: string;
  errorCode: string;
  timestamp: string;
  path: string;
}

export function createAppResponse<T>(dataType: any, isArray: boolean = false) {
  class AppResponseClass implements AppHttpResponse<T> {
    @ApiProperty({
      type: isArray ? [dataType] : dataType,
      description: 'Response data',
    })
    data: T;

    @ApiProperty({
      nullable: true,
      type: () => AppError,
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: InternalServerErrorHttp.ERROR_MSG,
        errorCode: 'INTERNAL_SERVER_ERROR',
        timestamp: new Date().toISOString(),
        path: '/example/path',
      },
      description: 'Error information if any',
    })
    error: AppHttpErrorResponse | null;
  }

  return AppResponseClass;
}

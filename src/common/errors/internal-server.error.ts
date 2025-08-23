import { HttpStatus } from '@nestjs/common';
import { AppError } from './base.error';

export class InternalServerErrorHttp extends AppError {
  static readonly ERROR_MSG = 'Internal server error';

  constructor(params: { errorCode: string; message?: string; cause?: any }) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      params.message || InternalServerErrorHttp.ERROR_MSG,
      params.errorCode,
      params.cause,
    );
  }
}

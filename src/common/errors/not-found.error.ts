import { HttpStatus } from '@nestjs/common';
import { AppError } from './base.error';

export class NotFoundErrorHttp extends AppError {
  static readonly ERROR_MSG = 'Not found';

  constructor(params: { errorCode: string; message?: string; cause?: any }) {
    super(
      HttpStatus.NOT_FOUND,
      params.message || NotFoundErrorHttp.ERROR_MSG,
      params.errorCode,
      params.cause,
    );
  }
}

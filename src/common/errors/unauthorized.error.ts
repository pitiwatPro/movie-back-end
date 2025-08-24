import { HttpStatus } from '@nestjs/common';
import { AppError } from './base.error';

export class UnauthorizedErrorHttp extends AppError {
  static readonly ERROR_MSG = 'Unauthorized';

  constructor(params: { errorCode: string; message?: string; cause?: any }) {
    super(
      HttpStatus.UNAUTHORIZED,
      params.message || UnauthorizedErrorHttp.ERROR_MSG,
      params.errorCode,
      params.cause,
    );
  }
}

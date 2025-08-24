import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UnauthorizedErrorHttp } from '../errors/unauthorized.error';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = this.extractApiKey(request);

    if (!apiKey) {
      throw new UnauthorizedErrorHttp({
        errorCode: 'API_KEY_MISSING',
        message: 'API key is required',
      });
    }

    const validApiKey = this.configService.get<string>('app.apiKey');

    if (!validApiKey) {
      throw new UnauthorizedErrorHttp({
        errorCode: 'SERVER_CONFIG_ERROR',
        message: 'Server configuration error',
      });
    }

    if (apiKey !== validApiKey) {
      throw new UnauthorizedErrorHttp({
        errorCode: 'INVALID_API_KEY',
        message: 'Invalid API key',
      });
    }

    return true;
  }

  private extractApiKey(request: Request): string | undefined {
    const headerApiKey = request.headers['x-api-key'] as string;
    if (headerApiKey) {
      return headerApiKey;
    }
    return '';
  }
}

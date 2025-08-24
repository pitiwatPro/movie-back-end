import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MovieRepository } from './core/adapters/movie.repository';
import { RadpidRepository } from './infrastructure/rapid/rapid.repository';
import configuration from './common/config/configuration';
import { RapidModule } from './infrastructure/rapid/rapid.module';
import { GetTopMovieUseCase } from './core/application/get-top-movie.usecase';
import { ConfigModule } from '@nestjs/config';
import { MovieHttp } from './infrastructure/http/movie/movie.http';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { HealthHttp } from './infrastructure/http/health/health.http';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    RapidModule,
  ],
  controllers: [HealthHttp, MovieHttp],
  providers: [
    GetTopMovieUseCase,
    {
      provide: MovieRepository,
      useClass: RadpidRepository,
    },
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}

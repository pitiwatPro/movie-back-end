import { Module } from '@nestjs/common';
import { MovieHttp } from './infrastructure/http/movie.http';
import { MovieRepository } from './core/adapters/movie.repository';
import { RadpidRepository } from './infrastructure/rapid/rapid.repository';
import configuration from './common/config/configuration';
import { RapidModule } from './infrastructure/rapid/rapid.module';
import { GetTopMovieUseCase } from './core/application/get-top-movie.usecase';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    RapidModule,
  ],
  controllers: [MovieHttp],
  providers: [
    GetTopMovieUseCase,
    {
      provide: MovieRepository,
      useClass: RadpidRepository,
    },
  ],
})
export class AppModule {}

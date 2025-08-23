import { Module } from '@nestjs/common';
import { MovieHttp } from './infrastructure/http/movie.http';
import { GetTopMovieUseCase } from './core/application/get-top-movie.usecase';
import { MovieRepository } from './core/adapters/movie.repository';

@Module({
  controllers: [MovieHttp],
  providers: [
    GetTopMovieUseCase,
    {
      provide: MovieRepository,
      useClass: class {},
    },
  ],
})
export class AppModule {}

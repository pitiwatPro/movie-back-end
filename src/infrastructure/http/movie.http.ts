import { Controller, Get } from '@nestjs/common';
import { GetTopMovieUseCase } from 'src/core/application/get-top-movie.usecase';

@Controller('movies')
export class MovieHttp {
  constructor(private readonly getTopMovieUseCase: GetTopMovieUseCase) {}

  @Get('/top-rated')
  async getTopRatedMovies() {
    const data = await this.getTopMovieUseCase.execute();

    return {
      data,
      error: null,
    };
  }
}

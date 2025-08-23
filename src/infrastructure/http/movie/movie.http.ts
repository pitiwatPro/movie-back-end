import { Controller, Get } from '@nestjs/common';
import { GetTopMovieUseCase } from 'src/core/application/get-top-movie.usecase';
import { GetTopRatedMoviesResponse } from './dto/get-top-movie.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('movies')
export class MovieHttp {
  constructor(private readonly getTopMovieUseCase: GetTopMovieUseCase) {}

  @Get('/top-rated')
  @ApiResponse({ status: 200, type: GetTopRatedMoviesResponse })
  async getTopRatedMovies(): Promise<GetTopRatedMoviesResponse> {
    const data = await this.getTopMovieUseCase.execute();

    return {
      data,
      error: null,
    };
  }
}

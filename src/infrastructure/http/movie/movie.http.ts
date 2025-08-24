import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetTopMovieUseCase } from 'src/core/application/get-top-movie.usecase';
import { GetTopRatedMoviesResponse } from './dto/get-top-movie.dto';
import { ApiResponse, ApiTags, ApiSecurity } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@ApiTags('Movies')
@ApiSecurity('api-key')
@Controller('movies')
@UseGuards(ApiKeyGuard)
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

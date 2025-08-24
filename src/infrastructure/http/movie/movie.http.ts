import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetTopMovieUseCase } from 'src/core/application/get-top-movie.usecase';
import { GetTopRatedMoviesResponse } from './dto/get-top-movie.dto';
import { ApiResponse, ApiTags, ApiSecurity } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { GetMovieDetailResponse } from './dto/get-movie-detail.dto';
import { MovieDetailUseCase } from 'src/core/application/get-movie-detail.usecase';

@ApiTags('Movies')
@ApiSecurity('api-key')
@Controller('movies')
@UseGuards(ApiKeyGuard)
export class MovieHttp {
  constructor(
    private readonly getTopMovieUseCase: GetTopMovieUseCase,
    private readonly getMovieDetailUseCase: MovieDetailUseCase,
  ) {}

  @Get('/top-rated')
  @ApiResponse({ status: 200, type: GetTopRatedMoviesResponse })
  async getTopRatedMovies(): Promise<GetTopRatedMoviesResponse> {
    const data = await this.getTopMovieUseCase.execute();

    return {
      data,
      error: null,
    };
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: GetMovieDetailResponse })
  async getMovieById(@Query('id') id: string): Promise<GetMovieDetailResponse> {
    const data = await this.getMovieDetailUseCase.execute(id);
    return {
      data,
      error: null,
    };
  }
}

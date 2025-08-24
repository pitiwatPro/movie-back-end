import { Inject } from '@nestjs/common';
import { MovieRepository } from '../adapters/movie.repository';
import { MovieDetail } from '../entities/movie-detail.entity';

export class MovieDetailUseCase {
  constructor(
    @Inject(MovieRepository) private readonly movieRepository: MovieRepository,
  ) {}

  async execute(id: string): Promise<MovieDetail> {
    const movieDetail = await this.movieRepository.getMovieDetailById(id);
    return movieDetail;
  }
}

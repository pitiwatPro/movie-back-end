import { Inject, Injectable } from '@nestjs/common';
import { MovieRepository } from '../adapters/movie.repository';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class GetTopMovieUseCase {
  constructor(
    @Inject(MovieRepository) private readonly movieRepository: MovieRepository,
  ) {}

  async execute(): Promise<Movie[]> {
    const topMovie = await this.movieRepository.getTopRatedMovies();
    return topMovie;
  }
}

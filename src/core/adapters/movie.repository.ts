import { Movie } from '../entities/movie.entity';

export interface MovieRepository {
  getTopRatedMovies(): Promise<Movie[]>;
}

export const MovieRepository = Symbol('MovieRepository');

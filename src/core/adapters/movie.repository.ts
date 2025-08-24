import { MovieDetail } from '../entities/movie-detail.entity';
import { Movie } from '../entities/movie.entity';

export interface MovieRepository {
  getTopRatedMovies(): Promise<Movie[]>;
  getMovieDetailById(id: string): Promise<MovieDetail>;
}

export const MovieRepository = Symbol('MovieRepository');

import { Injectable } from '@nestjs/common';
import { MovieRepository } from 'src/core/adapters/movie.repository';
import { Movie } from 'src/core/entities/movie.entity';
import { RapidApi } from './api/rapid.api';
import {
  RapidApiResponse,
  RapidMovieDetailApiResponse,
  RapidMovieItem,
} from './rapid.type';
import { MovieDetail } from 'src/core/entities/movie-detail.entity';
import { NotFoundErrorHttp } from 'src/common/errors/not-found.error';
@Injectable()
export class RadpidRepository implements MovieRepository {
  constructor(private readonly rapidApi: RapidApi) {}

  async getTopRatedMovies(): Promise<Movie[]> {
    const data = (await this.rapidApi.get(
      '/shows/search/filters?country=us&series_granularity=show&order_direction=desc&order_by=rating&show_type=movie',
    )) as RapidApiResponse;

    return data.shows.map((item: RapidMovieItem) => {
      const movie = new Movie();
      movie.id = item.id;
      movie.title = item.title;
      movie.overview = item.overview || '';
      movie.fullImage = item.imageSet?.horizontalPoster?.w1080 || '';
      movie.thumbnailImage = item.imageSet?.horizontalPoster?.w480 || '';
      return movie;
    });
  }

  async getMovieDetailById(id: string): Promise<MovieDetail> {
    const data = (await this.rapidApi.get(
      `/shows/${id}?series_granularity=show&output_language=en`,
    )) as RapidMovieDetailApiResponse;

    if (!data.id) {
      throw new NotFoundErrorHttp({
        message: 'Movie not found',
        errorCode: 'MOVIE_NOT_FOUND',
      });
    }

    const movieDetail = new MovieDetail();
    movieDetail.id = data.id;
    movieDetail.title = data.title;
    movieDetail.overview = data.overview || '';
    movieDetail.firstAirYear = data.firstAirYear || null;
    movieDetail.lastAirYear = data.lastAirYear || null;
    movieDetail.fullImage = data.imageSet?.horizontalPoster?.w1080 || '';
    movieDetail.genres = data.genres || [];
    movieDetail.creators = data.creators || [];
    movieDetail.cast = data.cast || [];
    movieDetail.rating = data.rating || null;
    movieDetail.seasonCount = data.seasonCount || null;
    movieDetail.episodeCount = data.episodeCount || null;
    return movieDetail;
  }
}

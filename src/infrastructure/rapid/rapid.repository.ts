import { Injectable } from '@nestjs/common';
import { MovieRepository } from 'src/core/adapters/movie.repository';
import { Movie } from 'src/core/entities/movie.entity';
import { RapidApi } from './api/rapid.api';

@Injectable()
export class RadpidRepository implements MovieRepository {
  constructor(private readonly rapidApi: RapidApi) {}

  async getTopRatedMovies(): Promise<Movie[]> {
    const data = await this.rapidApi.get(
      '/shows/search/filters?country=us&series_granularity=show&order_direction=desc&order_by=rating&show_type=movie',
    );

    return data.shows.map((item: any) => {
      const movie = new Movie();
      movie.id = item.id;
      movie.title = item.title;
      movie.overview = item.overview;
      movie.fullImage = item.imageSet.horizontalPoster.w1080;
      movie.thumbnailImage = item.imageSet.horizontalPoster.w480;
      return movie;
    });
  }
}

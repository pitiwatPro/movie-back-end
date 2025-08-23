import { ApiProperty } from '@nestjs/swagger';
import { createAppResponse } from 'src/common/helpers/http';
import { Movie } from 'src/core/entities/movie.entity';

export class GetTopRatedMoviesData implements Movie {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'Inception' })
  title: string;

  @ApiProperty({ example: 'A mind-bending thriller about dream invasion.' })
  overview: string;

  @ApiProperty({ example: 'https://image.url/full.jpg' })
  fullImage: string;

  @ApiProperty({ example: 'https://image.url/thumb.jpg' })
  thumbnailImage: string;
}

export class GetTopRatedMoviesResponse extends createAppResponse(
  GetTopRatedMoviesData,
  true,
) {}

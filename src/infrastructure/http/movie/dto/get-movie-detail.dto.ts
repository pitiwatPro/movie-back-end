import { ApiProperty } from '@nestjs/swagger';
import { createAppResponse } from 'src/common/helpers/http';
import { MovieDetail } from 'src/core/entities/movie-detail.entity';

export class GetMovieDetailData implements MovieDetail {
  @ApiProperty({
    description: 'Unique movie identifier',
    example: 'tt0111161',
  })
  id: string;

  @ApiProperty({
    description: 'Movie title',
    example: 'The Shawshank Redemption',
  })
  title: string;

  @ApiProperty({
    description: 'Movie plot overview',
    example:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  })
  overview: string;

  @ApiProperty({
    description: 'First air year',
    example: 1994,
  })
  firstAirYear: number;

  @ApiProperty({
    description: 'Last air year',
    example: 1994,
  })
  lastAirYear: number;

  @ApiProperty({
    description: 'Full resolution movie poster URL',
    example: 'https://example.com/poster-full.jpg',
  })
  fullImage: string;

  @ApiProperty({
    description: 'Movie genres',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
      },
    },
    example: [
      { id: 18, name: 'Drama' },
      { id: 80, name: 'Crime' },
    ],
  })
  genres: { id: number; name: string }[];

  @ApiProperty({
    description: 'Movie creators/directors',
    type: 'array',
    items: { type: 'string' },
    example: ['Frank Darabont'],
  })
  creators: string[];

  @ApiProperty({
    description: 'Main cast members',
    type: 'array',
    items: { type: 'string' },
    example: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
  })
  cast: string[];

  @ApiProperty({
    description: 'Movie rating (0-100)',
    example: 91,
    minimum: 0,
    maximum: 100,
  })
  rating: number;

  @ApiProperty({
    description: 'Number of seasons (for TV shows)',
    example: 1,
  })
  seasonCount: number;

  @ApiProperty({
    description: 'Total number of episodes (for TV shows)',
    example: 1,
  })
  episodeCount: number;
}

export class GetMovieDetailResponse extends createAppResponse(
  GetMovieDetailData,
) {}

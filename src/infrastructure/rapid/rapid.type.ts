export interface RapidImageSet {
  horizontalPoster: {
    w1080: string;
    w480: string;
  };
}

export interface RapidMovieItem {
  id: string;
  title: string;
  overview: string;
  imageSet: RapidImageSet;
}

export interface RapidApiResponse {
  shows: RapidMovieItem[];
}

export interface RapidMovieDetailApiResponse {
  id: string;
  title: string;
  overview: string;
  firstAirYear: number;
  lastAirYear: number;
  genres: {
    id: number;
    name: string;
  }[];
  creators: string[];
  cast: string[];
  rating: number;
  seasonCount: number;
  episodeCount: number;
  imageSet: RapidImageSet;
}

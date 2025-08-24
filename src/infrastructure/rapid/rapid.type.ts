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

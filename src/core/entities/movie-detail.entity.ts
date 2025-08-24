export class MovieDetail {
  id: string;
  title: string;
  overview: string;
  firstAirYear: number | null;
  lastAirYear: number | null;
  fullImage: string;
  genres: {
    id: number;
    name: string;
  }[];
  creators: string[];
  cast: string[];
  rating: number | null;
  seasonCount: number | null;
  episodeCount: number | null;
}

import { Company } from './Company';
import { Genre } from './Genre';

export class Movie {
  id!: number;
  title!: string;
  poster_path?: string;
  genres?: Genre[];
  homepage?: string;
  original_language?: string;
  overview?: string;
  production_companies?: Company[];
  release_date?: Date;
}

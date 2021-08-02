import { Movie } from "./Movie";

export class Query {
    page!: number;
    results!: Movie[];
    total_pages!: number;
    total_results!: number;
}
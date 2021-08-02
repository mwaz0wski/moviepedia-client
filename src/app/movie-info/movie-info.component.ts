import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../core/model/Movie';
import { MovieService } from '../core/services/movie.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.sass'],
})
export class MovieInfoComponent implements OnInit {
  movieId: any;
  movieInfo!: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('movieId');
    this.movieService
      .getMovieById(this.movieId)
      .then(
        (movieInfo: any) =>
          (this.movieInfo = JSON.parse(JSON.stringify(movieInfo)))
      );
  }

  toHomepage() {
    this.router.navigate(['/movie-query']);
  }
}

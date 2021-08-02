import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Entry } from '../core/model/Entry';
import { MovieService } from '../core/services/movie.service';

@Component({
  selector: 'app-movie-query',
  templateUrl: './movie-query.component.html',
  styleUrls: ['./movie-query.component.sass'],
})
export class MovieQueryComponent implements OnInit {
  private input = new Subject<any>();
  private navigation = new Subject();
  private inputSubscription!: Subscription;
  private navigationSubscription!: Subscription;
  moviesResponse!: any;
  currentTitle!: any;
  currentPage!: any;
  entryList: Array<Entry> = [];
  queryPages!: number[];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // Input subscription
    this.inputSubscription = this.input
      .pipe(
        map((event) => event.target!.value.trim().replace(/ +/g, '+')),
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe((title) => {
        if (title !== '') {
          this.currentTitle = title;
          this.currentPage = 1;
          this.movieService
            .searchByTitle(title)
            .then((response) => this.parseResponse(response));
        } else {
          this.moviesResponse = undefined;
        }
      });

    // Navigation subscription
    this.navigationSubscription = this.navigation.subscribe(() => {
      this.movieService
        .goToPage(this.currentTitle, this.currentPage)
        .then((response) => this.parseResponse(response));
    });
  }

  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe();
    this.navigationSubscription.unsubscribe();
  }

  private parseResponse(response: any) {
    let jsonResponse = JSON.stringify(response);
    this.moviesResponse = JSON.parse(jsonResponse);
    this.queryPages = Array(this.moviesResponse.total_pages).fill(undefined).map((x,i)=>i+1);
    this.generateEntry();
  }

  doFilter(event: Event) {
    this.input.next(event);
  }

  moveToPage(prueba: any) {
    switch (prueba) {
      case 'first':
        if (this.currentPage != 1) {
          this.currentPage = 1;
          break;
        }
        return;
      case 'previous':
        if (this.currentPage > 1) {
          this.currentPage -= 1;
          break;
        }
        return;
      case 'next': {
        if (this.currentPage < this.moviesResponse.total_pages) {
          this.currentPage += 1;
          break;
        }
        return;
      }
      case 'last':
        if (this.currentPage != this.moviesResponse.total_pages) {
          this.currentPage = this.moviesResponse.total_pages;
        } else {
          return;
        }
    }
    this.navigation.next();
  }
  private generateEntry() {
    this.entryList = [];
    this.moviesResponse.results.forEach((movie: any) => {
      let entry: Entry = new Entry();
      if (movie.poster_path !== undefined) {
        this.movieService.getMovieImageUrl(movie.id).then((imageUrl:any) => entry.imageUrl = imageUrl.image_url);
      }
      entry.id = movie.id;
      entry.title = movie.title;
      this.entryList.push(entry);
    });
  }

  onSelect(event: any) {
    this.currentPage = event.target.value;
    this.navigation.next();
  }
}

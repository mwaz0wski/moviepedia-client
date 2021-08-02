import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../utils/AppConstants';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  getMovieById(id: any) {
    return this.http.get(AppConstants.BASE_URI + '/' + id).toPromise();
  }

  getMovieImageUrl(id: any) {
    return this.http.get(AppConstants.BASE_URI + '/' + id + '/image-resource').toPromise();
  }

  constructor(private http: HttpClient) {}

  searchByTitle(title: any) {
    return this.http.get(AppConstants.BASE_URI + '?title=' + title).toPromise();
  }

  goToPage(title: any, page: any) {
    return this.http
      .get(AppConstants.BASE_URI + '?title=' + title + '&page=' + page)
      .toPromise();
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { MovieQueryComponent } from './movie-query/movie-query.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/movie-query',
    pathMatch: 'full',
  },
  {
    path: 'movie-query',
    component: MovieQueryComponent,
  },
  {
    path: 'movie-info/:movieId',
    component: MovieInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

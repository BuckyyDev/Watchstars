import {RouterModule, Routes} from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home/home.component";
export const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: '', component: HomeComponent }, // Home component for the root route
  { path: '**', redirectTo: '' } // Wildcard to handle unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


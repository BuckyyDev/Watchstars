import { Component } from '@angular/core';
import {MovieInformation} from "../interfaces/movieinformation";

@Component({
  selector: 'app-movies',
  standalone: false,
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  movieInformation: MovieInformation = {

    title: 'Inception',
    poster_url: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    year: 2010,
    overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \\"inception\\", the implantation of another person\'s idea into a target\'s subconscious.',

  }
}

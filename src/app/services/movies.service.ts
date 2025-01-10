import { Injectable } from '@angular/core';
import { MovieInformation } from '../interfaces/movieinformation';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiURL = 'http://localhost:8000'

  constructor(private httpClient: HttpClient) { }

  getMovies() {
    return this.httpClient.get(`${this.apiURL}/fetch-movies`);
  }

}

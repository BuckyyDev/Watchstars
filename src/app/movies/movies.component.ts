import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.moviesService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load movies';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

}

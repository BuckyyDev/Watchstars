import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../services/series.service';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnInit {
  series: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.seriesService.getSeries().subscribe({
      next: (data) => {
        this.series = data;
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

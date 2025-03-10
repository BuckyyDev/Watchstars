import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  
  private apiUrl = 'http://localhost:8000/series';

  constructor(private http: HttpClient) {}

  getSeries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

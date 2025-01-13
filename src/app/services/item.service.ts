import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:8000/info/';

  constructor(private http: HttpClient) {}

  // Fetch a specific movie or series by title_id
  getItemDetails(titleId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${titleId}`);
  }
}

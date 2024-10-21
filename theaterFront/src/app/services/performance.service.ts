import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Performance } from '../models/performance.model';
import { PerformanceWithPrices } from '../models/performance-ticket-price.model';
@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  private apiUrl = 'http://localhost:8080/api/performances'; 

  constructor(private http: HttpClient) {}

  getPerformances(): Observable<Performance[]> {
    return this.http.get<Performance[]>(this.apiUrl);
  }

  getPerformanceById(id: number): Observable<Performance> {
    return this.http.get<Performance>(`${this.apiUrl}/${id}`);
  }

  getPerformancesWithPrices(): Observable<PerformanceWithPrices[]> {
    return this.http.get<PerformanceWithPrices[]>(`${this.apiUrl}/with-prices`);
  }
}

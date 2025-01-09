import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Performance } from '../models/performance.model';
import { PerformanceWithPrices } from '../models/performance-ticket-price.model';
import { PerformanceDTO } from '../dto/PerfomanceDto';
@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  private apiUrl = 'http://localhost:8080/api/performances';
  private apiUrlTicket = 'http://localhost:8080/api/performance-ticket-prices';

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

  createPerformance(performanceData: PerformanceDTO): Observable<PerformanceDTO> {
    return this.http.post<PerformanceDTO>(this.apiUrl, performanceData);
  }

  createTicketPrices(ticketPriceData: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrlTicket}`, ticketPriceData);
  }
}

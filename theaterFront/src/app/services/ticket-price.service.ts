import { HttpClient } from "@angular/common/http";
import { PerformanceTicketPrice } from "../models/performance-ticket-price.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class TicketPriceService {
    private apiUrl = '/api/performance-ticket-prices';
  
    constructor(private http: HttpClient) { }
  
    getTicketPricesByPerformance(performanceId: number): Observable<PerformanceTicketPrice[]> {
      return this.http.get<PerformanceTicketPrice[]>(`${this.apiUrl}/performance/${performanceId}`);
    }
  }
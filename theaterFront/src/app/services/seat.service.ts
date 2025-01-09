import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seat } from '../models/seat.model';
import { SeatType } from '../models/seat-type.model';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private apiUrl = '/api/seats';
  private seatTypeUrl = '/api/seat-types';

  constructor(private http: HttpClient) { }

  getSeatsByPerformance(performanceId: number): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${this.apiUrl}/performance/${performanceId}`);
  }

  getSeatTypes(hallId: number): Observable<SeatType[]> {
    return this.http.get<SeatType[]>(`${this.seatTypeUrl}/hall/${hallId}`);
  }

  getAllSeatTypes(): Observable<SeatType[]> {
    return this.http.get<SeatType[]>(`${this.seatTypeUrl}`);
  }

}

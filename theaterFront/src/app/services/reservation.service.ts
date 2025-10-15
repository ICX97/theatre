import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationDTO } from '../dto/ReservationDto';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = '/api/reservations'; 

  constructor(private http: HttpClient) { }

  createReservation(reservation: ReservationDTO): Observable<ReservationDTO> {
    return this.http.post<ReservationDTO>(this.apiUrl, reservation);
  }

  getReservationsByPerformance(performanceId: number): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(`${this.apiUrl}/performance/${performanceId}`);
}
}

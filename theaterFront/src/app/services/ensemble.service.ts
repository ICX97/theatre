import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from '../models/actor.model';
import { EnsembleDto } from '../dto/EnsembleDto';

@Injectable({
  providedIn: 'root'
})
export class EnsembleService {
  private apiUrl = 'http://localhost:8080/api/ensemble'; // Backend URL

  constructor(private http: HttpClient) {}

  getAllActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.apiUrl);
  }

  getActorById(id: number): Observable<Actor> {
    return this.http.get<Actor>(`${this.apiUrl}/${id}`);
  }

  createEnsemble(ensembleData: EnsembleDto): Observable<EnsembleDto> {
    return this.http.post<EnsembleDto>(this.apiUrl, ensembleData);
  }
}
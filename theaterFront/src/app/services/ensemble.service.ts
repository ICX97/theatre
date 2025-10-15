import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actor } from '../models/actor.model';
import { EnsembleDto } from '../dto/EnsambleDto';

@Injectable({
  providedIn: 'root'
})
export class EnsembleService {
  private apiUrl = '/api/ensemble'; 

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

  updateEnsemble(id: number, ensembleData: EnsembleDto): Observable<EnsembleDto> {
    return this.http.put<EnsembleDto>(`${this.apiUrl}/${id}`, ensembleData);
  }

  deleteEnsemble(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Alias methods for actor operations
  updateActor(id: number, actorData: Actor): Observable<Actor> {
    return this.http.put<Actor>(`${this.apiUrl}/${id}`, actorData);
  }

  deleteActor(id: number): Observable<void> {
    return this.deleteEnsemble(id);
  }
}
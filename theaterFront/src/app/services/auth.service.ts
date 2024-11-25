import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, tap } from 'rxjs';

interface LoginResponse {
  token: string; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; 
  private loggedIn = false;
  constructor(private http: HttpClient) {
    //this.loggedIn = this.checkToken();
  }

  login(credentials: { username: string; password: string }): Observable<LoginResponse> { 
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      catchError(this.handleError),
      // Nakon uspešnog login-a, sačuvaj token i postavi loggedIn
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); 
          this.loggedIn = true; // Postavi loggedIn na true
        }
      })
    );
  }

  private checkToken(): boolean {
    // Proverava da li je token prisutan u localStorage
    const token = localStorage.getItem('token');
    return !!token; // Vraća true ako je token prisutan
  }

  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        if (typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
      }
      return throwError(() => new Error(errorMessage));
    }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout() {
    this.loggedIn = false;
  }
}
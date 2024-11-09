import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; //Promeni url 
  private loggedIn = false;
  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    this.loggedIn = true;
    return this.http.post(`${this.apiUrl}/login`, credentials);
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
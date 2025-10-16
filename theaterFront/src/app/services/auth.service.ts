import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, tap, BehaviorSubject } from 'rxjs';

interface LoginResponse {
  token: string; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth'; 
  private loggedIn = false;
  private loginSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient) {
    //this.loggedIn = this.checkToken();
  }

  // Observable for login state changes
  get loginState$(): Observable<boolean> {
    return this.loginSubject.asObservable();
  }

  login(credentials: { username: string; password: string }): Observable<LoginResponse> { 
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      catchError(this.handleError),
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); 
          this.loggedIn = true; 
          this.loginSubject.next(true); 
        }
      })
    );
  }

  private checkToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }

  register(user: { username: string; email: string; password: string }): Observable<any> {
    const registerData = {
      username: user.username,
      user_email: user.email,
      user_password: user.password
    };
    return this.http.post(`${this.apiUrl}/register`, registerData).pipe(
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
        } else if (error.status === 400) {
          errorMessage = 'Invalid request. Please check your input.';
        } else if (error.status === 401) {
          errorMessage = 'Invalid username or password.';
        } else if (error.status === 403) {
          errorMessage = 'Access denied.';
        }
      }
      
      return throwError(() => new Error(errorMessage));
    }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.loginSubject.next(false);
  }
}
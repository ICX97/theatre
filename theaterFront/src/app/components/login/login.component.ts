import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ username: this.username, password: this.password }).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        
        this.isLoading = false;
        this.router.navigate(['/']); 
      },
      error => {
        console.error('Login failed', error);
        this.isLoading = false;
        this.errorMessage = error.message || 'Login failed. Please check your credentials.';
      }
    );
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    username: string = '';
    email: string = '';
    password: string = '';
    isLoading: boolean = false;
    errorMessage: string = '';
    successMessage: string = '';
  
    constructor(private authService: AuthService, private router: Router) {}
  
    onRegister() {
        if (!this.username || !this.email || !this.password) {
            this.errorMessage = 'Please fill in all fields';
            return;
        }

        if (!this.isValidEmail(this.email)) {
            this.errorMessage = 'Please enter a valid email address';
            return;
        }

        if (this.password.length < 6) {
            this.errorMessage = 'Password must be at least 6 characters long';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';

        this.authService.register({ username: this.username, email: this.email, password: this.password }).subscribe(
            response => {
                this.isLoading = false;
                this.successMessage = 'Account created successfully! Redirecting to login...';
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 2000);
            },
            error => {
                console.error('Registration failed', error);
                this.isLoading = false;
                
                if (error.message === "User already exists!") {
                    this.errorMessage = 'Username or email already exists. Please try different credentials.';
                } else {
                    this.errorMessage = error.message || 'Registration failed. Please try again.';
                }
            }
        );
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
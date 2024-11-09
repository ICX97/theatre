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
  
    constructor(private authService: AuthService, private router: Router) {}
  
    onRegister() {
      this.authService.register({ username: this.username, email: this.email, password: this.password }).subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']); // preusmeri na login stranicu
        },
        error => {
          if (error.message === "User already exists!") {
            console.error('User already exists. Redirecting to login.');
            this.router.navigate(['/login']); // Preusmeri na login ako korisnik već postoji
          } else {
            console.error('Registration failed', error);
          }
        }
      );
    }
}
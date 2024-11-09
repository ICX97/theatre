import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public authService: AuthService, public router: Router) {}

  logout() {
    localStorage.clear();
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }
}

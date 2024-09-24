import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newUsername: string = '';
  newEmail: string = '';
  newPassword: string = '';

  onRegister() {
    // Logika za registraciju, kao što je slanje podataka serveru
    console.log('Registracija:', { newUsername: this.newUsername, newEmail: this.newEmail, newPassword: this.newPassword });
  }
}
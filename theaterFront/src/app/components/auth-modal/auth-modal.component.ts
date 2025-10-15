import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  closeModal() {
    this.close.emit();
  }

  goToLogin() {
    this.router.navigate(['/login']);
    this.closeModal();
  }

  goToRegister() {
    this.router.navigate(['/register']);
    this.closeModal();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}

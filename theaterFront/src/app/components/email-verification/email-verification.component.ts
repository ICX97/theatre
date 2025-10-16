import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  verificationStatus: 'loading' | 'success' | 'error' = 'loading';
  message: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.verifyEmail();
      } else {
        this.verificationStatus = 'error';
        this.message = 'No verification token provided.';
      }
    });
  }

  verifyEmail() {
    this.http.get(`/api/auth/verify-email?token=${this.token}`)
      .subscribe({
        next: (response: any) => {
          this.verificationStatus = 'success';
          this.message = response.message || 'Email verified successfully!';
        },
        error: (error) => {
          this.verificationStatus = 'error';
          this.message = error.error?.message || 'Email verification failed.';
        }
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}


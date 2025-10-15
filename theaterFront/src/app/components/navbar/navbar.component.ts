import { Component, OnInit, HostListener, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  showUserDropdown: boolean = false;
  userInfo: { username: string; role: string } | null = null;
  isAdmin: boolean = false;
  private storageListener: (event: StorageEvent) => void;
  private loginSubscription!: Subscription;

  constructor(
    public authService: AuthService, 
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.storageListener = (event: StorageEvent) => {
      if (event.key === 'token') {
        this.loadUserInfo();
        this.checkAdminStatus();
      }
    };
  }

  refreshUserInfo() {
    this.loadUserInfo();
    this.checkAdminStatus();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserInfo();
      this.checkAdminStatus();
      window.addEventListener('storage', this.storageListener);
      
      // Subscribe to login state changes
      this.loginSubscription = this.authService.loginState$.subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.loadUserInfo();
          this.checkAdminStatus();
        } else {
          this.userInfo = null;
          this.isAdmin = false;
        }
      });
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('storage', this.storageListener);
      if (this.loginSubscription) {
        this.loginSubscription.unsubscribe();
      }
    }
  }

  loadUserInfo() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userInfo = {
          username: decodedToken.sub || 'User',
          role: decodedToken.role || 'USER'
        };
        this.isAdmin = decodedToken.role === 'ROLE_ADMIN';
      } catch (error) {
        console.error('Error decoding token:', error);
        this.userInfo = null;
        this.isAdmin = false;
      }
    } else {
      this.userInfo = null;
      this.isAdmin = false;
    }
  }

  checkAdminStatus() {
    if (!this.authService.isLoggedIn()) {
      this.isAdmin = false;
      this.userInfo = null;
    } else {
      // Reload user info if logged in but userInfo is null
      if (!this.userInfo) {
        this.loadUserInfo();
      }
    }
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  closeUserDropdown() {
    this.showUserDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const userProfileContainer = target.closest('.user-profile-container');
    
    if (!userProfileContainer && this.showUserDropdown) {
      this.closeUserDropdown();
    }
  }

  logout() {
    localStorage.clear();
    this.authService.logout(); 
    this.userInfo = null;
    this.isAdmin = false;
    this.showUserDropdown = false;
    this.router.navigate(['/login']);
  }
}

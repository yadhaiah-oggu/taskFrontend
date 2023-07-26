// session.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionTimer: any;
  private sessionTimeout: number = 3600000; // 1 hour in milliseconds

  constructor(private router: Router) { }

  private sessionExpired() {
    this.clearSessionTimer();
    this.router.navigate(['/session-timeout']);
  }

  private clearSessionTimer() {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
    }
  }

  private getTokenExpirationDate(token: string): Date | null {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      if (tokenPayload && tokenPayload.exp) {
        return new Date(tokenPayload.exp * 1000); // Convert to milliseconds
      }
    } catch (error) {
      console.error('Error parsing token:', error);
    }
    return null;
  }

  isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    if (expirationDate) {
      return expirationDate <= new Date();
    }
    return true;
  }

  resetSessionTimer(token: string) {
    this.clearSessionTimer();
    const expirationDate = this.getTokenExpirationDate(token);
    if (expirationDate) {
      const now = new Date().getTime();
      const timeout = expirationDate.getTime() - now;
      if (timeout > 0) {
        this.sessionTimer = setTimeout(() => {
          this.sessionExpired();
        }, timeout);
      } else {
        this.sessionExpired();
      }
    }
  }

  logout() {
    this.clearSessionTimer();
    localStorage.removeItem('token');
    localStorage.removeItem('token-expiration');
  }
}


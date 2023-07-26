// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private token: string = ''; // JWT token

  constructor(
    private router : Router
  ) {
    // Check if the token exists in local storage during service initialization
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.isAuthenticated = true;
      this.token = storedToken;
    }
  }

  // Perform user login and get JWT token from the server
  login(email: string, password: string){
    // Replace 'YOUR_LOGIN_API_ENDPOINT' with your actual API endpoint for login
    const loginUrl = 'YOUR_LOGIN_API_ENDPOINT';
    const userData = { email, password };
    this.isAuthenticated = true;
    localStorage.setItem('token',"token");
    return true;
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in based on the presence of the token
    return this.isAuthenticated;
  }

  getToken(): string {
    return this.token;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.token = '';
    localStorage.removeItem('token'); // Remove the token from local storage
    this.router.navigate(['/login'])
  }
}

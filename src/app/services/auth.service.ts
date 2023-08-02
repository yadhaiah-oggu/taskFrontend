// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;

  _baseUrl = environment.baseUrl;


  constructor(
    private router : Router,
    private http:HttpClient
  ) {
  }

  login(userCredentials : any){
    // return this.http.post(this._baseUrl + "auth/login", userCredentials);
    return this.http.post(this._baseUrl + "auth/login", userCredentials).pipe(
      tap((response : any) => {
        const token = response.token ;
        localStorage.setItem('token' , token);
        localStorage.setItem('username',response.username);
        localStorage.setItem('userrole',response.userrole);
      })

    );

  }
  register(userCredentials: any){
    return this.http.post(this._baseUrl + "auth/register", userCredentials);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }

  getToken(){
    return localStorage.getItem('token');
  }


  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token'); 
    localStorage.removeItem('username'); 
    localStorage.removeItem('userrole');
    // Remove the token from local storage
    this.router.navigate(['/login'])
  }
}

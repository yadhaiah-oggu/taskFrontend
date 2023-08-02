// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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
    // return this.http.post(this._baseUrl + "auth/login", userCredentials).pipe(
    //   tap((response : any) => {
    //     const token = response.token ;
    //     localStorage.setItem('token' , token);
    //     localStorage.setItem('username',response.username);
    //     localStorage.setItem('userrole',response.userrole);
    //   })

    // );

    return this.http.post(this._baseUrl + "auth/login", userCredentials, { observe: 'response' }).pipe(
      map((response : any) => {
        if (response.status >= 200 && response.status <=299) {
          console.log(response.body);
          const token = response.body?.token ;
          localStorage.setItem('token' , token);
          localStorage.setItem('username',response.body?.username);
          localStorage.setItem('userrole',response.body?.userrole);
          return response.body; 
        } else {
          console.log(response.body);
          return throwError(response.body);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(error);
      })
    );

  }


  // register(userCredentials: any){
  //   return this.http.post(this._baseUrl + "auth/register", userCredentials);
  // }



  register(userCredentials: any): Observable<any> {
    return this.http.post(this._baseUrl + "auth/register", userCredentials, { observe: 'response' }).pipe(
      map((response) => {
        if (response.status >= 200 && response.status <=299) {
          console.log(response.body);
          return response.body; 
        } else {
          console.log(response.body);
          return throwError(response.body);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(error);
      })
    );
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

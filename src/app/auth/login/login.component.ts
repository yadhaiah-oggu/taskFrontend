import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: any = FormGroup;
  submitted = false;
  isLoggedIn: boolean = false;
  loginError: string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private sessionService : SessionService
  ) {
    localStorage.clear();
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.sessionService.logout();
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    if (this.submitted) {
      console.log(this.loginForm.value);
      this.router.navigate(['/home']);
      // this.authService.login(this.loginForm.value).subs(
      //   (token: string) => {
      //     localStorage.setItem('token', token); // Store the JWT token in the local storage
      //     this.isLoggedIn = true;
      //     this.sessionService.resetSessionTimer(token); // Start session timeout timer
      //     this.router.navigate(['/home']); // Navigate to the home component after successful login
      //   },
      //   (error: any) => {
      //     // Handle login error here
      //     this.loginError = 'Invalid email or password.';
      //     console.error('Login failed:', error);
      //   }
      // );
  
    }
  }

  signup(){
    this.router.navigate(['/register']);
  }
 
}

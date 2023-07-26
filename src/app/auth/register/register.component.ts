import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerForm: any = FormGroup;
  submitted = false;
  registerError: string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private sessionService : SessionService
  ) {
    localStorage.clear();
  }

  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.sessionService.logout();
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    if (this.submitted) {
      console.log(this.registerForm.value);
      this.router.navigate(['/login']);
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

  signin(){
    this.router.navigate(['/login']);
  }
}

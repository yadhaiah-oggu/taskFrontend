import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import Swal from 'sweetalert2';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

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
  resposeData: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService,
    private _snackBar: MatSnackBar
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
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
      console.log(response);
      this._snackBar.open("Login Successful", "Close");
      this.router.navigate(['/home']);
    },
    (error) => {
      console.log(error) ;
      Swal.fire(error.error);
    })
  }
  signup() {
    this.router.navigate(['/register']);
  }
}

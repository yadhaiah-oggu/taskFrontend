import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerForm: any = FormGroup;
  submitted = false;
  registerError: string = '';
  resposeData : any;
  
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
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        passwordValidator() // Add the custom validator here
      ]],
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
      this.authService.register(this.registerForm.value).subscribe(result =>{
        if(result !== null){
          this.resposeData = result;
          console.log(this.resposeData);
          alert("Registered Successfully");
          this.router.navigate(['/login']);
        }
       },
       (error) =>{
        alert(error.error);
        console.log(error.error);
        
       });
    }
  }

  signin(){
    this.router.navigate(['/login']);
  }
}

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password: string = control.value;

    // Password should contain at least one special character and one uppercase letter
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseLetterRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;

    const hasSpecialCharacter = specialCharacterRegex.test(password);
    const hasUppercaseLetter = uppercaseLetterRegex.test(password);
    const hasNumber = numberRegex.test(password);

    const errors: any  = {};

    if (!hasSpecialCharacter) {
      errors['specialCharacter'] = true;
    }

    if (!hasUppercaseLetter) {
      errors['uppercaseLetter'] = true;
    }

    if (!hasNumber) {
      errors['number'] = true;
    }

    return Object.keys(errors).length > 0 ? { passwordInvalid: errors } : null;
  };
}

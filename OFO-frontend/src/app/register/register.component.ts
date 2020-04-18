import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailFormControl = new FormControl('email', [
    Validators.required,
    Validators.email,
  ]);

  usernameFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  ageFormControl = new FormControl('', [
    Validators.min(1)
  ]);

  ngForm = new FormGroup({
    emailFormControl:this.emailFormControl,
    usernameFormControl:this.usernameFormControl,
    passwordFormControl:this.passwordFormControl,
    ageFormControl: this.ageFormControl,
    jobFormControl: new FormControl(''),
    hobbiesFormControl: new FormControl(''),
    aboutMeFormControl: new FormControl('')
  });

  matcher = new MyErrorStateMatcher();
  serverError = null;

  constructor(private authService: AuthService) {

  }

  submit(email, name, password, age, job, hobbies, aboutMe){
    this.authService.createUser(email, name, password, age, job ,hobbies, aboutMe).then(res => {
      if((res as any).status != 0){
        this.serverError = (res as any).message;
      }
    });
  }

  ngOnInit(): void {
  }

}

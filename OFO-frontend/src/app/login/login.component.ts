import { AuthService } from './../auth.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName = '';

  public userPassword = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  login(username, password){
    this.authService.validate(username, password)
    .then((response) => {
      this.authService.setUserInfo((response as any).token);
      this.router.navigate(['']);
    }).catch(err => console.log('login rejected'));
  }
  redirectToRegisterView(){
    this.router.navigate(['/register']);
  }

}

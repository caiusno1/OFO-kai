import { OFOEvent } from './../OFOEvent';
import { Observable, of } from 'rxjs';
import { AuthService } from './../auth.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName = '';

  public userPassword = '';

  public targetEventID: string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log("Params"+ params);
      this.targetEventID = params.id;
    });
   }

  ngOnInit() {
    if (this.authService.isAuthenticated()){
      if (this.targetEventID){
        console.log(this.targetEventID);
        this.router.navigate([`/myevent/${this.targetEventID}`]);
      } else {
        this.router.navigate(['/profile']);
      }
    }
  }

  login(username, password){
    this.authService.validate(username, password)
    .then((response) => {
      this.authService.setUserInfo((response as any).token);
      if (this.targetEventID){
        console.log(this.targetEventID);
        this.router.navigate([`/myevent/${this.targetEventID}`]);
      } else {
        this.router.navigate(['/profile']);
      }

    }).catch(err => console.log('login rejected'));
  }
  redirectToRegisterView(){
    if (this.targetEventID){
      this.router.navigate([`/register/${this.targetEventID}`]);
    } else {
      this.router.navigate(['/register']);
    }
  }

}

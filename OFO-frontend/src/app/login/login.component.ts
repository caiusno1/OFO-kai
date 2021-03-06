/**
 * LoginForm component not more not less
 */
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    // track url params to route correctly (to the queryied event via share link) if the creditials are given correctly
    this.route.params.subscribe(params => {
      this.targetEventID = params.id;
    });
   }

  ngOnInit() {
    if (this.authService.isAuthenticated()){
      // depending on the URL params route to my profile or the event given by the URLParamter (as event id)
      if (this.targetEventID){
        console.log(this.targetEventID);
        this.router.navigate([`/myevent/${this.targetEventID}`]);
      } else {
        this.router.navigate(['/profile']);
      }
    }
  }
  // check whether the given credentials are correct and save username and JWT Token (that will be delivered by the server)
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

    }).catch(() => console.log('login rejected'));
  }
  // if the register button will be hidden pass the event id param if given and switch to the register component
  redirectToRegisterView(){
    if (this.targetEventID){
      this.router.navigate([`/register/${this.targetEventID}`]);
    } else {
      this.router.navigate(['/register']);
    }
  }

}

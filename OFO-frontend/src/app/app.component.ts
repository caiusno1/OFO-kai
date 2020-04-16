import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OFO-frontend';
  constructor(private authService: AuthService){}
  logout(){
    this.authService.logout();
  }
}

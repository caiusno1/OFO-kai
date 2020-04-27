import { environment } from './../../environments/environment.prod';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  public mobileMode = false;
  public events = [];
  public shareUrlPrefix = environment.sourceDomain;
  columnsToDisplay = ['date', 'time', 'topic', 'service', 'joined', 'link'];
  columnsToDisplayMobile = ['date', 'topic', 'joined'];
  constructor(userService: UserService) {
    userService.getMyEvents().subscribe(myevents => this.events = myevents);
  }

  ngOnInit(): void {
    // enable mobile view if screensize is below 960 pixel
    const mq = window.matchMedia( '(max-width: 960px)' );

    if (mq.matches) {
      this.mobileMode = true;
    } else {
      this.mobileMode = false;
    }
  }
  getColumnsToDisplay(){
    if (this.mobileMode){
      return this.columnsToDisplayMobile;
    } else {
      return this.columnsToDisplay;
    }
  }

}

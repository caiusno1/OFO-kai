import { EventService } from './../event.service';
import { BetterPritableOFOEvent } from './../BetterPritableOFOEvent';
import { AuthService } from './../auth.service';
import { OFOEvent } from './../OFOEvent';
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
  public events: BetterPritableOFOEvent[] = [];
  public shareUrlPrefix = environment.sourceDomain;
  public myUserName: string;
  columnsToDisplay = ['date', 'time', 'topic', 'service', 'joined', 'link'];
  columnsToDisplayMobile = ['date', 'topic', 'joined'];
  constructor(userService: UserService, authService: AuthService, private eventService: EventService) {
    this.myUserName = authService.getMyUsername();
    userService.getMyEvents().subscribe(myevents => {
      this.events = myevents as BetterPritableOFOEvent[];
      // transform the event list to contain additional implict information such as whether i joined the event
      this.events = this.events.map((event) => {
        const  bPevent = event as BetterPritableOFOEvent;
        bPevent.meJoined = this.AmIJoined(bPevent);
        bPevent.IamTheOrganiser = bPevent.organiser.name === this.myUserName;
        return bPevent;
      });
    });
  }

  ngOnInit(): void {
    // enable mobile view if screensize is below 960 pixel
    // (delete some colums in the table on a mobile device)
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
  // handle the checkbox behavior
  JointOrUnregister(event: BetterPritableOFOEvent){
    if (event.meJoined){
      event.meJoined = false;
      this.eventService.removeMeFromEvent(event.id);
    } else {
      event.meJoined = true;
      this.eventService.joinMeToEvent(event.id);
    }
  }
  AmIJoined(event: BetterPritableOFOEvent){
    return event.organiser.name === this.myUserName
    || event.joinedParticipants.map((p) => p.name).includes(this.myUserName);
  }

}

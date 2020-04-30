/**
 * Component for visalising a single event (given by id as route parama)
 */
import { AuthService } from './../auth.service';
import { OFOEvent } from './../OFOEvent';
import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {
  public myEvent$: Observable<OFOEvent>;
  public eventID: string;
  public myEvent: OFOEvent;
  public myName: string;
  public IamTheOrganiser: boolean;
  constructor(private route: ActivatedRoute, private eventService: EventService, private authService: AuthService) {
    this.myName = authService.getMyUsername();
    this.route.paramMap.subscribe(params => {
      this.eventID = params.has('id') ?  params.get('id') : '';
      this.myEvent$ = this.eventService.getEvent(this.eventID);
      this.myEvent$.subscribe((event) => this.IamTheOrganiser = event.organiser.name === this.myName);
    });
  }

  ngOnInit(): void {
  }
  // If the user hit the join button he/she should be registered to the event
  joinMe(){
    this.eventService.joinMeToEvent(this.eventID);
  }

}

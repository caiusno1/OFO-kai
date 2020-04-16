import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  public events = [];
  columnsToDisplay = ['date', 'time', 'topic', 'service'];
  constructor(userService: UserService) {
    userService.getMyEvents().subscribe(myevents => this.events = myevents);
  }

  ngOnInit(): void {
  }

}

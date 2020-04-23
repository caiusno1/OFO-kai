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
  constructor(private route: ActivatedRoute, private eventService: EventService) {
    this.myEvent$ = this.route.paramMap.pipe(
      switchMap<ParamMap, Observable<OFOEvent>>((params: ParamMap) =>
        this.eventService.getEvent(params.get('id')))
    );
  }

  ngOnInit(): void {
  }

}

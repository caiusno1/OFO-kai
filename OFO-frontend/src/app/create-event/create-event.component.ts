import { environment } from './../../environments/environment';
import { EventService } from './../event.service';
import { Participant } from './../Participants';
import { Component, OnInit } from '@angular/core';
import { AddParticipateDialogComponent } from '../add-participate-dialog/add-participate-dialog.component';
import {MatDialog} from '@angular/material/dialog';



@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  // form value variables
  selected = 'None';
  public participants: Participant[] = [];
  private dateString: string;
  private timeString: string;

  // Event creating status variables
  createdSuccessfull = false;
  createdUnSuccessfull = false;
  public particpantsAreNotAvailable = false;
  public particpantsNotAvailable: Participant[];
  public timeSuppremum = '0:00';

  // share link variables
  shareLink = null;
  shareLinkEncoded = null;
  smartShareEnabled: boolean;

  constructor(public dialog: MatDialog, private eventService: EventService) { }

  ngOnInit(): void {
    // check whether browser supports the html5 share api
    this.smartShareEnabled = 'share' in window.navigator;
  }
  openAddParticipantDialog(){
    const dialogRef = this.dialog.open(AddParticipateDialogComponent, {
      height: '400px',
      width: '600px',
      data: this.participants
    });
    dialogRef.afterClosed().subscribe(result => {
      // sync particiapants from dialog
      console.log('The dialog was closed');
      this.participants = result;
      this.checkDatesForParticipants();
    });
  }
  // submit event data to the server for adding to the db
  submitEvent(topic, date, time, platform, description){
    console.log('Save event');
    this.eventService.addEvent({topic, date, time, participants: this.participants, platform, description}).then((msg) => {
      // show result (negative and positive) and share link / button (on success)
      if ( (msg as any).status){
        this.createdUnSuccessfull = true;
      } else {
        this.shareLink = `${environment.sourceDomain}ofo/share/${(msg as any).id}`;
        this.shareLinkEncoded = encodeURIComponent(this.shareLink);
        this.createdSuccessfull = true;
      }
    });
  }
  // Date inputfield change handler
  onDateChange(value){
    this.dateString = value;
    this.checkDatesForParticipants();
  }
  // Time inputfield change handler
  onTimeChange(value){
    this.timeString = value;
    this.checkDatesForParticipants();
  }
  // Check whether all participants are available at the given date and time and otherwise make suggestions
  checkDatesForParticipants(){
    if (this.timeString && this.dateString){
      this.particpantsAreNotAvailable = false;
      this.particpantsNotAvailable = [];
      this.timeSuppremum = '0:00';
      const weekDay = new Date(this.dateString);

      // basicaly similar to functional inject operator (lookup sum types if you are interested in this technique)
      const dayInj = (day: number) => {
        switch (day){
          case 0:
            return (participant: Participant) => participant.sundayFreetime;
          case 1:
            return (participant: Participant) => participant.mondayFreetime;
          case 2:
            return (participant: Participant) => participant.tuesdayFreetime;
          case 3:
            return (participant: Participant) => participant.wednessdayFreetime;
          case 4:
            return (participant: Participant) => participant.thursdayFreetime;
          case 5:
            return (participant: Participant) => participant.fridayFreetime;
          case 6:
            return (participant: Participant) => participant.saturdayFreetime;
        }
      };
      // convert daytime to minutes from the start of the day. Therefore times can be compared
      const convert2minutes = (m: string) => {
        const splittedTime = m.split(':');
        return Number.parseInt(splittedTime[0], 10) * 60 + Number.parseInt(splittedTime[1], 10);
      };

      const freetimeForEventDay = dayInj(weekDay.getDay());
      // Compute not available participants
      for (const participant of this.participants){
          if (convert2minutes(this.timeString) < convert2minutes(freetimeForEventDay(participant))){
            this.particpantsNotAvailable.push(participant);
          }
      }
      // Compute minimum time to start the event at the given day
      for (const particpant of this.particpantsNotAvailable){
        if (convert2minutes(this.timeSuppremum) < convert2minutes(freetimeForEventDay(particpant))){
          this.timeSuppremum = particpant.mondayFreetime;
        }
      }
      this.particpantsAreNotAvailable = this.particpantsNotAvailable.length > 0;
    }
  }
  shareViaAPI(){
    // if share api is enabled show native share dialog
    if ('share' in window.navigator){
      (window.navigator as any).share({url: this.shareLink, text: 'Let us meet via OFM', title: 'Event join request'});
    }
  }

}

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
  selected = 'None';
  createdSuccessfull = false;
  createdUnSuccessfull = false;
  public participants: Participant[] = [];
  constructor(public dialog: MatDialog, private eventService: EventService) { }

  ngOnInit(): void {

  }
  openAddParticipantDialog(){
    const dialogRef = this.dialog.open(AddParticipateDialogComponent, {
      height: '400px',
      width: '600px',
      data: this.participants
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.participants = result;
    });
  }
  submitEvent(topic, date, time, platform){
    console.log("Save event");
    this.eventService.addEvent({topic, date, time, participants: this.participants, platform}).then((msg) => {
      if ( (msg as any).status){
        this.createdUnSuccessfull = true;
      } else {
        this.createdSuccessfull = true;
      }
    });
  }

}

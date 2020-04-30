import { UserService } from './../user.service';
import { Participant } from './../Participants';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
/**
 * Dialog for adding friends to an event to create
 */
@Component({
  selector: 'app-add-participate-dialog',
  templateUrl: './add-participate-dialog.component.html',
  styleUrls: ['./add-participate-dialog.component.css']
})
export class AddParticipateDialogComponent implements OnInit {

  // List of loaded friends
  public friends: Participant[];

  constructor(
    // Dialogwrapper reference (Angular Material specific)
    public dialogRef: MatDialogRef<AddParticipateDialogComponent>,
    // Injected data that dialog and parent component share
    @Inject(MAT_DIALOG_DATA) public data: Participant[],
    // Service for handling user specific data (and synchronizity to the server)
    userService: UserService
  )
  {
      // pull friendlist from the server to load to the UI
      userService.getFriends().subscribe(friends => {
        this.friends = friends;
      });
      // disable close button // close will happen when clicking somewhere else then the dialog
      dialogRef.disableClose = true; // disable default close operation
      dialogRef.backdropClick().subscribe(result => {
        dialogRef.close(this.getData());
      });
      // sync added friends from the model to the dialog (neccesary for reopening the dialog)
      dialogRef.afterOpened().subscribe(result => {
        this.friends.forEach(element => {
          element.selected = false;
        });
        this.friends.filter(
          (item) =>
            this.data.map(dataitem => dataitem.name).includes(item.name)
        )
        .forEach((item) => item.selected = true);
      });
    }
    // handling hit of the checkboxes to actually add friends to an event
    public onSelectionChange(particpants: MatListOption[]){
      this.data = particpants.map((item) => item.value);
    }
    // an getter function for the added friends such then the actually added friends will be synched to the parent component
    private getData(): Participant[]
    {
      return this.data;
    }

  ngOnInit(): void {
  }

}

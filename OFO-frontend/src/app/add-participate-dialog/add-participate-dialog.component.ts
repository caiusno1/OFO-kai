import { UserService } from './../user.service';
import { Participant } from './../Participants';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-add-participate-dialog',
  templateUrl: './add-participate-dialog.component.html',
  styleUrls: ['./add-participate-dialog.component.css']
})
export class AddParticipateDialogComponent implements OnInit {

  public friends: Participant[];

  constructor(
    public dialogRef: MatDialogRef<AddParticipateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Participant[],
    userService: UserService
    ) {

      userService.getFriends().subscribe(friends => {
        this.friends = friends;
      });

      dialogRef.disableClose = true; // disable default close operation
      dialogRef.backdropClick().subscribe(result => {
        dialogRef.close(this.getData());
      });
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
    public onSelectionChange(particpants: MatListOption[]){
      this.data = particpants.map((item) => item.value);
    }
    private getData(): Participant[]
    {
      return this.data;
    }

  ngOnInit(): void {
  }

}

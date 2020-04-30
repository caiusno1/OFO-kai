import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {

  usernameNotExist = false;
  serverError = false;
  unknownError = false;
  successfullyAdded = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  addFriend(friendname: string){
    this.userService.addFriend({name: friendname}).then( (msg) => {
      this.serverError = false;
      this.unknownError = false;
      this.usernameNotExist = false;
      this.successfullyAdded = false;

      if (msg.status){
        if (msg.status === 1){
          this.serverError = true;
        } else if (msg.status === 2){
          this.usernameNotExist = true;
        } else {
          this.unknownError = true;
        }
      } else {
        this.successfullyAdded = true;
      }
    }).catch( () => {
      this.unknownError = true;
    });
  }

}

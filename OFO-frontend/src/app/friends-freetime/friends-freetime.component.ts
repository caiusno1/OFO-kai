import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

class Freetimehandler {
  mondayFreetime = '18:00';
  tuesdayFreetime = '0:00';
  wednessdayFreetime = '0:00';
  thursdayFreetime = '0:00';
  fridayFreetime = '0:00';
  saturdayFreetime = '0:00';
  sundayFreetime = '0:00';
}

@Component({
  selector: 'app-friends-freetime',
  templateUrl: './friends-freetime.component.html',
  styleUrls: ['./friends-freetime.component.css']
})
export class FriendsFreetimeComponent{
  infreetimeHandler: Freetimehandler;
  outfreetimeHandler: Freetimehandler;
  constructor(private userService: UserService){
    this.infreetimeHandler = new Freetimehandler();
    this.userService.getMyFreetime().then( (freetime) => {
      console.log(freetime);
      this.infreetimeHandler = freetime;
    });
    this.outfreetimeHandler = new Freetimehandler();
  }
  changeFreetimeMonday(time){
    this.outfreetimeHandler.mondayFreetime = time;
  }
  changeFreetimeTuesday(time){
    this.outfreetimeHandler.tuesdayFreetime = time;
  }
  changeFreetimeWednesday(time){
    this.outfreetimeHandler.wednessdayFreetime = time;
  }
  changeFreetimeThursday(time){
    this.outfreetimeHandler.thursdayFreetime = time;
  }
  changeFreetimeFriday(time){
    this.outfreetimeHandler.fridayFreetime = time;
  }
  changeFreetimeSaturday(time){
    this.outfreetimeHandler.saturdayFreetime = time;
  }
  changeFreetimeSunday(time){
    this.outfreetimeHandler.sundayFreetime = time;
  }
  submit(){
    console.log(this.outfreetimeHandler);
    this.userService.setMyFreetime(this.outfreetimeHandler).then((result) => {
      console.log('Successfully saved freetime');
    }).catch((err) => {
      console.log('Freetime could not be saved');
    });
  }
}

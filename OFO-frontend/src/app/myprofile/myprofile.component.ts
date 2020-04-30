/** What this component do: Visualize the users profile */
import { IProfile } from './../IProfile';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  user: Observable<IProfile>;
  constructor(private userService: UserService) {
    this.user = userService.getProfile();
  }

  ngOnInit(): void {
  }

}

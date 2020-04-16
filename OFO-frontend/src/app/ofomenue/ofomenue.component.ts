import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ofomenue',
  templateUrl: './ofomenue.component.html',
  styleUrls: ['./ofomenue.component.css']
})
export class OFOMenueComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }
  public route(path: string){
    this.router.navigate([path, {}], {});
  }

}

/**
 * A simple HTTP service for querying events, joining events ...
 */
import { OFOEvent } from './OFOEvent';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  joinMeToEvent(eventid: string) {
    this.httpService.post(`${environment.apiPrefix}joinMeToEvent`, { id: eventid }).toPromise().then((msg) => {
      console.log(msg);
      return msg;
    });
  }
  removeMeFromEvent(eventid: any) {
    this.httpService.post(`${environment.apiPrefix}removeMeFromEvent`, { id: eventid }).toPromise().then((msg) => {
      console.log(msg);
      return msg;
    });
  }

  constructor(private httpService: HttpClient) {

  }
  addEvent(event: any){
    console.log('Do http request');
    return this.httpService.post(`${environment.apiPrefix}addEvent`, event).toPromise().then((msg) => {
      console.log(msg);
      return msg;
    });
  }
  getEvent(id: string){
    return this.httpService.post<OFOEvent>(`${environment.apiPrefix}getMyEvent`, {id: id});
  }
}

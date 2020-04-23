import { OFOEvent } from './OFOEvent';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpService: HttpClient) {

  }
  addEvent(event: any){
    console.log("Do http request");
    return this.httpService.post(`${environment.apiPrefix}addEvent`, event).toPromise().then((msg) => {
      console.log(msg);
      return msg;
    });
  }
  getEvent(id: string){
    return this.httpService.post<OFOEvent>(`${environment.apiPrefix}getEvent`, id);
  }
}

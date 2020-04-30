import { OFOEvent } from './OFOEvent';
import { Participant } from './Participants';
import { IProfile } from './IProfile';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlPrefix = environment.apiPrefix;

  constructor(private httpClient: HttpClient) { }

  public getMyFreetime(): any{
    return this.httpClient.get(`${this.urlPrefix}getMyFreetime`).toPromise();
  }
  public getProfile(): Observable<IProfile>{
    return this.httpClient.get<IProfile>(`${this.urlPrefix}profile`);
  }
  public getFriends(){
    return this.httpClient.get<Participant[]>(`${this.urlPrefix}friends`);
  }
  public getMyEvents(){
    return this.httpClient.get<OFOEvent[]>(`${this.urlPrefix}myevents`);
  }
  public setMyFreetime(freetime: any){
    return this.httpClient.post<any>(`${this.urlPrefix}setMyFreetime`, freetime).toPromise();
  }
  public addFriend(friendNameQuery: any) {
    return this.httpClient.post<any>(`${this.urlPrefix}addFriend`, friendNameQuery).toPromise();
  }
}

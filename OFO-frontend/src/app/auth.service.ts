/**
 * This service manage all authentication related stuff such as asking the server for an JWT Token, providing the stored username ...
 */
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line:variable-name
  private _username: string;
  public createUser(email: string, name: string, password: string, age: number, job: string,hobbies: string, aboutMe: string) {
    return this.http.post(`${environment.apiPrefix}register`,
    {email, name, password, age, job, hobbies, aboutMe})
    .toPromise()
    .then((res) => {
      if ((res as any).status === 0){
        this.router.navigate(['/login']);
      }
    })
    .catch((err) => Promise.reject());
  }

  constructor(private http: HttpClient, private router: Router) { }

  public isAuthenticated(): boolean {
    const userData = localStorage.getItem('id_token');
    if (userData ){
      return true;
    }
    return false;
  }

  public setUserInfo(token){
    localStorage.setItem('id_token', token);
  }

  public logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public validate(username, password) {
    return this.http.post(`${environment.apiPrefix}authenticate`, {username, password })
    .toPromise()
    .then((valid) => {
      if (valid){
        this._username = username;
        localStorage.setItem('username', username);
      }
      return valid;
    }).catch(
    (err) => Promise.reject());
  }

  public getMyUsername(): string {
    if (this._username){
      return this._username;
    } else {
      return localStorage.getItem('username');
    }

  }
}

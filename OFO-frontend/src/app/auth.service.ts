import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public createUser(email: string, name: string, password: string, age: number, job: string,hobbies: string, aboutMe: string) {
    return this.http.post(`${environment.apiPrefix}register`, 
    {email: email, name: name, password: password, age: age, job:job, hobbies: hobbies, aboutMe: aboutMe})
    .toPromise().catch((err) => Promise.reject()).then((res)=> {
      if((res as any).status == 0) this.router.navigate(['/login']);
    });
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

  public validate(email, password) {
    return this.http.post(`${environment.apiPrefix}authenticate`, {username : email, password : password})
    .toPromise().catch((err) => Promise.reject());
  }
}

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

import { User } from './../../_models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReplaySubject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
 // jwtToken: any;
  decodedToken: any; // new ReplaySubject<string>(1);
 // currentToken$ = this.decodedToken.asObservable();

constructor(private http: HttpClient, private dataService: DataService) { }

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
       // this.decodedToken.next(this.jwtToken);
        console.log(this.decodedToken);
      }
    })
  );
}

// setTokenGlobally(decodedToken: any) {
//   this.decodedToken.next(decodedToken);
// }

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

loggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.dataService.changeItemCount(0);
 // this.decodedToken.next(null);
}

registerUser(user: User) {
  return this.http.post(this.baseUrl + 'register', user, {observe: 'response'});
}

}

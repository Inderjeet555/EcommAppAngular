import { User } from './../_models/User';
import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EcommApp';
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit() {
   const token = localStorage.getItem('token');
   const user = localStorage.getItem('user');

   if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

  }


}

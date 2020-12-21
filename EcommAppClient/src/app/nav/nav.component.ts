import { map, window } from 'rxjs/operators';
import { User } from './../../_models/User';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AuthService } from './../_services/auth.service';
import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { style } from '@angular/animations';
import { DatePipe, Location, DOCUMENT } from '@angular/common';
import { DataService } from '../_services/data.service';
import { ModalService } from '../_services/modal.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../app.component.css']
})
export class NavComponent implements OnInit {
  itemCount = 0;

  constructor(private authService: AuthService, private alertify: AlertifyService,
              private data: DataService, private modalServiceLogin: ModalService) { }

  ngOnInit() {
    this.data.currentCount.subscribe(itemCount => this.itemCount = itemCount);
    if (!this.authService.loggedIn()) {
    this.openLoginModalDialog();
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  openLoginModalDialog() {
    this.modalServiceLogin.openModalWithComponent();
  }

  loggedOut() {
    this.authService.loggedOut();
    this.alertify.success('Logged Out Successfully');
  }

  getItemCount(itemCount) {
    console.log(itemCount);
  }
}




// @Component({
//   selector: 'app-content',
//   template: ''
// })



// export class ModalContentComponent implements OnInit {

// }


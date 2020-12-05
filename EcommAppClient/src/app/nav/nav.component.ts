import { map } from 'rxjs/operators';
import { User } from './../../_models/User';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AuthService } from './../_services/auth.service';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { style } from '@angular/animations';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../app.component.css']
})
export class NavComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {

  }

  openModalWithComponent() {
    const initialState = {
      list: [

      ],
      title: 'Login'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent , {class: 'modal-dialog-centered' , initialState});
    this.bsModalRef.content.closeBtnName = 'Login';
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  loggedOut() {
    this.authService.loggedOut();
    this.alertify.success('Logged Out Successfully');
  }

  getItemCount(itemCount) {
    console.log(itemCount);
  }
}




@Component({
  selector: 'app-content',
  template: `

  <div *ngIf="isOpenForm" class="d-flex flex-column justify-content-center align-items-center">
        <div class="modal-header">
          <h4 class="modal-title">{{title}}</h4>
        </div>

        <form  [formGroup]="loginForm" (ngSubmit)="Login()">

        <div class="form-group mt-4">
        <input type="text"
        [ngClass]="{'is-invalid': loginForm.get('username').errors && loginForm.get('username').touched}"
        class="form-control"
        formControlName="username"
          placeholder="Username" [(ngModel)]="model.username">
          <div class="invalid-feedback">Please enter UserName</div>
      </div>

      <div class="form-group w-150">
        <input type="text input-sm" type="password"
        [ngClass]="{'is-invalid': loginForm.get('password').errors && loginForm.get('password').touched}"
        class="form-control"
        formControlName="password"
          placeholder="Password" [(ngModel)]="model.password">
          <div class="invalid-feedback">Please enter password</div>
      </div>

        </form>

        <div class="modal-footer justify-content-center">
          <button type="button" [disabled]="!loginForm.valid" type="submit"
           class="btn btn-default" (click)="Login()">{{closeBtnName}}</button>
        </div>
        <p>New Customer? <a [routerLink]="['']"  (click)="openRegisterForm()"> Create an account</a></p>
</div>

<!-- Register template Start------------------------------------------------------------------------------------------->

<div *ngIf="!isOpenForm" class="d-flex flex-column justify-content-center align-items-center">
        <div class="modal-header">
          <h4 class="modal-title text-justify">Sign up to start shopping</h4>
        </div>

        <form  [formGroup]="registerForm" (ngSubmit)="registerUser()">

        <div class="form-group mt-4">
        <input type="text"
        [ngClass]="{'is-invalid': registerForm.get('username').errors && registerForm.get('username').touched}"
        class="form-control"
        formControlName="username"
          placeholder="Username" [(ngModel)]="model.username">
          <div class="invalid-feedback">Please enter UserName</div>
      </div>

      <div class="form-group w-150">
        <input type="text input-sm" type="password"
        [ngClass]="{'is-invalid': registerForm.get('password').errors && registerForm.get('password').touched}"
        class="form-control"
        formControlName="password"
          placeholder="Password" [(ngModel)]="model.password">
          <div class="invalid-feedback">Please enter password</div>
      </div>

    <div class="form-group">
    <label class="control-label" style="margin-right:10px">Gender: </label>
    <label class="radio-inline">
      <input class="mr-3" type="radio" value="male" formControlName="gender">Male
    </label>
    <label class="radio-inline ml-3">
      <input class="mr-3" type="radio" value="female" formControlName="gender">Female
    </label>
  </div>

      <div class="form-group">
    <input [ngClass]="{'is-invalid': registerForm.get('dateOfBirth').errors &&
    registerForm.get('dateOfBirth').touched}" class="form-control"
      placeholder="Date of Birth" formControlName="dateOfBirth" type="text" bsDatepicker [bsConfig]="bsConfig" >
    <div class="invalid-feedback" *ngIf="registerForm.get('dateOfBirth').touched &&
    registerForm.get('dateOfBirth').hasError('required')">Date of Birth is required</div>
  </div>

        </form>

        <div class="modal-footer justify-content-center">
          <button type="button" [disabled]="!registerForm.valid" type="submit"
           class="btn btn-default" (click)="registerUser()">Register</button>
        </div>
</div>

<!-- Register template End----------------------------------------------------------------------------------------------->

  `,
  styles: ['a { text-decoration: none; color:#0066CC;} p {color:#0066CC}']
})



export class ModalContentComponent implements OnInit {
  title: string;
  user: User;
  closeBtnName: string;
  list: any[] = [];
  loginForm: FormGroup;
  registerForm: FormGroup;
  model: any = {};
  isOpenForm = true;
  bsConfig: Partial<BsDatepickerConfig> = {isAnimated: true, dateInputFormat: 'DD/MM/YYYY'};

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder,
              private authService: AuthService, private alertify: AlertifyService, private router: Router, private datePipe: DatePipe) {}

  ngOnInit() {
    this.createLoginForm();
    this.createRegisterForm();
  }

  Login() {
    this.authService.login(this.model).subscribe(next => {
      this.bsModalRef.hide();
      this.alertify.success('LoggedIn Successfully');
    }, error => {
      this.alertify.error('Invalid Credentials');
    },
      () => {
        this.router.navigate(['']);
      }
    );
  }

  openRegisterForm() {
    this.isOpenForm = false;
    this.model.username = '';
    this.model.password = '';
  }

  registerUser() {
        if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.registerUser(this.user).pipe(
        map((response: any) => {
          const res = response;
        })
      ).subscribe((response) => {
        this.alertify.success('Registered Successfully');
        this.bsModalRef.hide();
      },
      error => {
        this.alertify.error('User already exists!!');
      }
      );
    }
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });
  }
}


import { map } from 'rxjs/operators';
import { User } from './../../_models/User';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AuthService } from './../_services/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { DatePipe, Location, DOCUMENT } from '@angular/common';
import { CartService } from '../_services/cart.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: ['a { text-decoration: none; color:#0066CC;} p {color:#0066CC}']
})
export class ModalComponent implements OnInit {

  title: string;
  user: User;
  closeBtnName: string;
  list: any[] = [];
  loginForm: FormGroup;
  registerForm: FormGroup;
  model: any = {};
  isOpenForm = true;
  itemCount = 0;
  bsConfig: Partial<BsDatepickerConfig> = {isAnimated: true, dateInputFormat: 'DD/MM/YYYY'};

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder,
              private authService: AuthService, private alertify: AlertifyService, private router: Router, private datePipe: DatePipe,
              private cartService: CartService) {}

  ngOnInit() {
    this.createLoginForm();
    this.createRegisterForm();
  }


  Login() {
   this.authService.login(this.model).subscribe(next => {
      this.bsModalRef.hide();
      this.alertify.success('LoggedIn Successfully');
      this.cartService.getCartCount(this.authService.getTokenFromLocalStorage());
    }, error => {
      this.alertify.error('Invalid Credentials');
    },
      () => {
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

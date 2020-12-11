import { ProductDetailResolver } from './_resolvers/productsDetail.resolver';
import { ProductResolver } from './_resolvers/products.resolver';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ModalContentComponent, NavComponent } from './nav/nav.component';
import { appRoutes } from './routes';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { ProductDetailComponent } from './productDetail/productDetail.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';



export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavComponent,
      ProductsComponent,
      AboutComponent,
      ContactComponent,
      AccountComponent,
      CartComponent,
      ModalContentComponent,
      ProductDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      ModalModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      ReactiveFormsModule,
      FormsModule,
      BsDatepickerModule.forRoot(),
      JwtModule.forRoot({
         config: {
            tokenGetter,
          }
      })
   ],
   entryComponents: [
      ModalContentComponent
   ],
   providers: [
      DatePipe,
      ProductResolver,
      ProductDetailResolver,
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

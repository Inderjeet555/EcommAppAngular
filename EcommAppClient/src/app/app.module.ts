import { ModalComponent } from './modal/modal.component';
import { ProductDetailResolver } from './_resolvers/productsDetail.resolver';
import { ProductResolver } from './_resolvers/products.resolver';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { appRoutes } from './routes';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { ProductDetailComponent } from './productDetail/productDetail.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from 'src/_interceptors/loading.interceptor';



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
    //  ModalContentComponent,
      ProductDetailComponent,
      ModalComponent
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
      NgxSpinnerModule,
      BsDatepickerModule.forRoot(),
      JwtModule.forRoot({
         config: {
            tokenGetter,
            allowedDomains: ['localhost:5000'],
            disallowedRoutes: ['localhost:5000/api/auth']
          }
      })
   ],
   entryComponents: [
      ModalComponent
   ],
   providers: [
      DatePipe,
      ProductResolver,
      ProductDetailResolver,
      AuthService,
      {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

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


@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavComponent,
      ProductsComponent,
      AboutComponent,
      ContactComponent,
      AccountComponent,
      CartComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ModalModule.forRoot(),
      RouterModule.forRoot(appRoutes)
   ],
   entryComponents: [ModalContentComponent],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

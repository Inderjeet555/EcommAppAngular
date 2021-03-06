import { ProductDetailComponent } from './productDetail/productDetail.component';
import { ProductResolver } from './_resolvers/products.resolver';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailResolver } from './_resolvers/productsDetail.resolver';
import { NavComponent } from './nav/nav.component';


export const appRoutes: Routes = [
    {path: '', component: HomeComponent, resolve: {products: ProductResolver}},
    {
       path: '',
     //  runGuardsAndResolvers: 'always',
       // canActivate: [AuthGuard],
        children: [
            {path: 'about', component: AboutComponent},
            {path: 'contact', component: ContactComponent},
            {path: 'account', component: AccountComponent},
            {path: 'products', component: ProductsComponent},
           // {path: 'cart', component: CartComponent},
            {path: 'productDetail/:id', component: ProductDetailComponent, resolve: {product: ProductDetailResolver}},
            {path: 'cart', component: CartComponent,
            // resolve: {cart: ProductDetailResolver}
        },
      //  {path: 'login', component: ModalContentComponent},
        {path: 'nav', component: NavComponent}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

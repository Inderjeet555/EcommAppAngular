import { Cart } from './../../_models/cart';
import { CartService } from './../_services/cart.service';
import { Product } from './../../_models/Product';
import { delay, map } from 'rxjs/operators';
import { ProductService } from './../_services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { nextTick } from 'process';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css']
})

export class HomeComponent implements OnInit {
  products: Product[] = [];
  itemCount = 0;
  cart: Cart = {CartId: 0, ProductId: 0, Quantity: 0, UsersId: 0};

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router,
              private cartService: CartService, private alertify: AlertifyService) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.products = data['products'];
      // console.log(this.products);
    });
  }

  AddTocart(prodId: number, userId: number) {
    this.cart.ProductId = prodId;
    this.cart.UsersId = userId;
    this.cartService.addToCart(this.cart).pipe(
      map(res => {
        console.log(res);
      })
    ).subscribe(
      (response) => {
        this.alertify.success('Item added to cart successfully');
      },
      error => {
        this.alertify.error('Failed to add to cart!');
      }
  );
    this.getCartCount(1);

    this.router.navigate(['cart']);

    // this.itemCount
}

  getCartCount(userId: number) {
    this.cartService.getCartCount(userId).pipe(
      map(value => {this.itemCount = value as number; console.log(this.itemCount); })
    ).subscribe(
      count => {
       // this.itemCount =  count as number;
      //  console.log(this.itemCount);
      }
    );
    console.log(this.itemCount);
  }

}

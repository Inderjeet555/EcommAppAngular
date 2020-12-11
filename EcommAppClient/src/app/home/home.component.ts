import { Cart } from './../../_models/cart';
import { CartService } from './../_services/cart.service';
import { Product } from './../../_models/Product';
import { map } from 'rxjs/operators';
import { ProductService } from './../_services/product.service';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { nextTick } from 'process';
import { DataService } from '../_services/data.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css']
})

export class HomeComponent implements OnInit {
  @Output() itemCountOutput = new EventEmitter();
  products: Product[] = [];
  itemCount = 0;
  currentUserId: number = this.authService.decodedToken === undefined ?  -1 : this.authService.decodedToken.nameid;
  // tslint:disable-next-line: max-line-length
  cart: Cart = {CartId: 0, ProductId: 0, Quantity: 0, UsersId:  this.currentUserId};

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router,
              private cartService: CartService, private alertify: AlertifyService, private data: DataService,
              private authService: AuthService) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.products = data['products'];
      this.data.currentCount.subscribe(itemCount => this.itemCount = itemCount);
      this.getCartCount(this.currentUserId);
    });
  }

  AddTocart(prodId: number, userId: number) {
    this.cart.ProductId = prodId;
    this.cart.UsersId = +userId;
    this.cartService.addToCart(this.cart).pipe(
      map(res => {
      })
    ).subscribe(
      (response) => {
        this.getCartCount(this.currentUserId);
        this.alertify.success('Item added to cart successfully');
      },
      error => {
        this.alertify.error('Failed to add to cart!');
      }
  );
}

  getCartCount(userId: number) {
      this.cartService.getCartCount(userId).pipe(
      map(value => value)
    ).subscribe(
      {
        next: (itemCount) => {
          this.itemCount = (itemCount as number);
          this.data.changeItemCount(this.itemCount);
        }
      }
    );
  }
}

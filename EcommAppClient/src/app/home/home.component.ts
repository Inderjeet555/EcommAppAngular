import { Cart } from './../../_models/cart';
import { CartService } from './../_services/cart.service';
import { Product } from './../../_models/Product';
import { map } from 'rxjs/operators';
import { ProductService } from './../_services/product.service';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { DataService } from '../_services/data.service';
import { AuthService } from '../_services/auth.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css']
})

export class HomeComponent implements OnInit {
  @Output() itemCountOutput = new EventEmitter();
  products: Product[] = [];
  itemCount = 0;
 // currentUserId: number = this.authService.decodedToken === undefined ?  -1 : this.authService.decodedToken.nameid;
  // tslint:disable-next-line: max-line-length
  cart: Cart = {CartId: 0, ProductId: 0, Quantity: 0, UsersId: -1};

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router,
              private cartService: CartService, private alertify: AlertifyService, private data: DataService,
              private authService: AuthService, private modalServiceLogin: ModalService) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.products = data['products'];
      this.data.currentCount.subscribe(itemCount => this.itemCount = itemCount);
      this.cartService.getCartCount(this.authService.getTokenFromLocalStorage());
    });
  }

  AddTocart(prodId: number) {
    if (!this.authService.loggedIn()) {
      this.modalServiceLogin.openModalWithComponent();
    } else {
      this.cart.ProductId = prodId;
      this.cart.UsersId = +this.authService.getTokenFromLocalStorage();
      console.log(this.cart.UsersId);
      this.cartService.addToCart(this.cart).pipe(
      map(res => {
      })
    ).subscribe(
      (response) => {
        this.cartService.getCartCount(this.authService.getTokenFromLocalStorage());
        this.alertify.success('Item added to cart successfully');
      },
      error => {
        this.alertify.error('Failed to add to cart!');
      }
  );
    }
}
}

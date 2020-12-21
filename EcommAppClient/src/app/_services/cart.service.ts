import { map } from 'rxjs/operators';
import { Cart } from './../../_models/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl + 'cart/';
  itemCount = 0;

constructor(private http: HttpClient, private authService: AuthService, private data: DataService) { }


addToCart(cart: Cart) {
  return this.http.post(this.baseUrl + 'saveToCart', cart, {observe: 'response'});
}

 getCartCounts(userId: number) {
   return this.http.get(this.baseUrl + 'GetCartCount/' + userId);
}

getCartCount(userId: number) {
 return this.getCartCounts(this.authService.getTokenFromLocalStorage()).pipe(
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

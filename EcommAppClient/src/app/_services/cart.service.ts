import { map } from 'rxjs/operators';
import { Cart } from './../../_models/cart';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl + 'cart/';

constructor(private http: HttpClient) { }


addToCart(cart: Cart) {
  return this.http.post(this.baseUrl + 'saveToCart', cart, {observe: 'response'});
}

getCartCount(userId: number) {
  return this.http.get(this.baseUrl + 'GetCartCount/' + userId);
}

}

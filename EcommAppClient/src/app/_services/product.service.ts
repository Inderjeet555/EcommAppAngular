import { map } from 'rxjs/operators';
import { User } from './../../_models/User';
import { Product } from './../../_models/Product';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }


getProducts() {
  return this.http.get<Product[]>(this.baseUrl + 'home'  + '/GetProducts/').pipe(
    map(response => {
      return response;
    })
  );
}

}

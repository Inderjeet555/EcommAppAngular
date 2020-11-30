import { Product } from './../../_models/Product';
import { map } from 'rxjs/operators';
import { ProductService } from './../_services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css']
})

export class HomeComponent implements OnInit {
  products: Product[] = [];


  constructor(private productService: ProductService, private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.products = data['products'];
      // console.log(this.products);
    });
  }

}

import { ProductService } from './../_services/product.service';
import { Observable, of } from 'rxjs';
import { Product } from './../../_models/Product';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';



@Injectable()
export class ProductResolver implements Resolve<Product[]> {

    constructor(private alertify: AlertifyService, private router: Router, private productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
        return this.productService.getProducts().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving user');
                this.router.navigate(['']);
                return of(null);
            })
        )
    }
}
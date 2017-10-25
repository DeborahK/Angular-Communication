import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;

    constructor(private productService: ProductService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.getProduct(id);
    }

    getProduct(id: number) {
        this.productService.getProduct(id).subscribe(
          product => this.product = product,
          error => this.errorMessage = <any>error
        );
      }

    onBack(): void {
        this.router.navigate(['/products']);
    }
}

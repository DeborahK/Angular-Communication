import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    filteredProducts: IProduct[];
    products: IProduct[];
    errorMessage: string;
    listFilter: string;
    showImage: boolean;

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    performFilter(filterBy: string): void {
        if (filterBy) {
            filterBy = filterBy.toLocaleLowerCase();
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}

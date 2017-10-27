import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
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
                this.filteredProducts = this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    performFilter(filterBy: string): IProduct[] {
        if (filterBy) {
            filterBy = filterBy.toLocaleLowerCase();
            return this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
        } else {
            return this.products;
        }
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}

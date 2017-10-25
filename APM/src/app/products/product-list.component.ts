import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    filteredProducts: IProduct[];
    products: IProduct[];
    errorMessage: string;

    get listFilter(): string {
        return this.productParameterService.filterBy;
    }
    set listFilter(value: string) {
        this.productParameterService.filterBy = value;
        this.filteredProducts = this.performFilter(this.listFilter);
    }

    get showImage(): boolean {
        return this.productParameterService.displayPosters;
    }
    set showImage(value: boolean) {
        this.productParameterService.displayPosters = value;
    }

    constructor(private productService: ProductService,
                private productParameterService: ProductParameterService,
                private route: ActivatedRoute) { }

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

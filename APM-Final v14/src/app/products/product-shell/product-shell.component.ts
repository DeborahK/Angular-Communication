import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit, OnDestroy {
    pageTitle = 'Products';
    monthCount: number;
    sub: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.sub = this.productService.selectedProductChanges$.subscribe(
            selectedProduct => {
                if (selectedProduct) {
                    const start = new Date(selectedProduct.releaseDate);
                    const now = new Date();
                    this.monthCount = now.getMonth() - start.getMonth()
                        + (12 * (now.getFullYear() - start.getFullYear()));
                } else {
                    this.monthCount = 0;
                }
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}

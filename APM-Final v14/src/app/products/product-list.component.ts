import { Component, OnInit, ViewChild } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  includeDetail = true;

  imageWidth = 50;
  imageMargin = 2;
  errorMessage = ''

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  // Using the "?" sets the default to undefined
  // Then need to check for undefined whenever referencing filterComponent
  @ViewChild(CriteriaComponent) filterComponent?: CriteriaComponent;

  get showImage(): boolean {
    return this.productParameterService.showImage;
  }
  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  constructor(private productService: ProductService,
              private productParameterService: ProductParameterService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        // Allows referencing the ViewChild property in ngOnInit and
        // Prevents the 'Expression has changed after it was checked' error 
        setTimeout(() => {
          if (this.filterComponent) {
            this.filterComponent.listFilter =
              this.productParameterService.filterBy;
          }
        })
      },
      error: err => this.errorMessage = err
    });
  }

  onValueChange(value: string): void {
    this.productParameterService.filterBy = value;
    this.performFilter(value);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(product =>
        product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }
}

import { Component, OnInit, ViewChild, AfterViewInit, QueryList, ElementRef, ViewChildren } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';
import { StarComponent } from '../shared/star.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    //@ViewChild(StarComponent) div: StarComponent;
   // @ViewChildren('star') div: QueryList<StarComponent>;
   // @ViewChild('filterForm') filterForm;
    @ViewChild('filter') filterElement: ElementRef;

    pageTitle: string = 'Product List';
    filteredProducts: IProduct[];
    products: IProduct[];
    errorMessage: string;
    listFilter: string;
    
    // private _listFilter: string;

    // get listFilter(): string {
    //     return this._listFilter;
    // }
    // set listFilter(value: string) {
    //     this._listFilter = value;
    //     this.filteredProducts = this.performFilter(this.listFilter);
    // }

    get showImage(): boolean {
        return this.productParameterService.displayPosters;
    }
    set showImage(value: boolean) {
        this.productParameterService.displayPosters = value;
    }

    constructor(private productService: ProductService,
                private productParameterService: ProductParameterService) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.filteredProducts = this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngAfterViewInit(): void {
        //console.log(`In AfterViewInit: ${this.div.first}`);        
        // this.div.changes.subscribe((ctrl: QueryList<StarComponent>) => 
        //                 console.log(`In subscribe: ${ctrl.first.rating}`))

        //this.filterInput.valueChanges.subscribe(value => console.log(value)); 
        // const x = Observable.fromEvent(this.filterInput.nativeElement, 'input')
        //                     .subscribe(() =>this.filteredProducts = this.performFilter(this.listFilter)); 
        //this.filterForm.valueChanges.subscribe(() => this.filteredProducts = this.performFilter(this.listFilter));
        //this.divElement.nativeElement.style.backgroundColor = 'red';
        //console.log(this.divElement.nativeElement.style.backgroundColor);
        console.log(this.filterElement);
        this.filterElement.nativeElement.focus();
    }

    // onFilterChange(filterBy: string): void {
    //     this.listFilter = filterBy;
    //     this.performFilter(this.listFilter);
    // }

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

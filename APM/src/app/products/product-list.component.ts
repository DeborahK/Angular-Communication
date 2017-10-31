import { Component, OnInit, ViewChild, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';
import { StarComponent } from '../shared/star.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { NgModel, FormControl, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    filteredProducts: IProduct[];
    products: IProduct[];
    errorMessage: string;
    //listFilter: string;

   // @ViewChild(StarComponent) div: StarComponent;
    // @ViewChildren('star') div: QueryList<StarComponent>;
    // @ViewChild('filterForm') filterForm;
    // @ViewChild('filter') filterInput: NgModel;
    @ViewChild(StarComponent) star;
    private _filterInput: NgModel;
    private _sub: Subscription;
    // @ViewChildren('inputElement, nameElement') inputElements: QueryList<ElementRef>;
    @ViewChildren(NgModel) inputElements: QueryList<FormControl>;

    // get filterInput(): NgModel {
    //     return this._filterInput;
    // }

    // @ViewChild(NgModel)
    // set filterInput(value: NgModel) {
    //     this._filterInput = value;
    //     console.log(this.filterInput);
    //     if (this.filterInput && !this._sub) {
    //         console.log("About to subscribe");
    //         this._sub = this.filterInput.valueChanges.subscribe(() => {
    //             this.performFilter(this.listFilter);
    //             console.log("In valueChanges");
    //         });
    //     }
    // }

    private _listFilter: string;

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.performFilter(this.listFilter);
    }

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
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    ngAfterViewInit(): void {
        // this.filterInput.valueChanges.subscribe(value => console.log(value));
        // const x = Observable.fromEvent(this.filterInput.nativeElement, 'input')
        //                     .subscribe(() =>this.filteredProducts = this.performFilter(this.listFilter));
        // this.filterForm.valueChanges.subscribe(() => this.filteredProducts = this.performFilter(this.listFilter));
        // console.log(this.filterInput);
        // this.filterInput.valueChanges.subscribe(
        //     value => this.performFilter(this.listFilter)
        // );
        // this.filterElement.nativeElement.focus();
        console.log(this.inputElements);


        console.log('About to subscribe');
        this.inputElements.first.valueChanges.subscribe(() => {
            this.performFilter(this.listFilter);
            console.log('In subscribe');
        });
    }

    // onFilterChange(filterBy: string): void {
    //     this.listFilter = filterBy;
    //     this.performFilter(this.listFilter);
    // }

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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subject, BehaviorSubject, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productsUrl = 'api/products';
    private products: IProduct[];

    private selectedProductSource = new BehaviorSubject<IProduct | null>(null);
    selectedProductChanges$ = this.selectedProductSource.asObservable();

    constructor(private http: HttpClient) { }

    changeSelectedProduct(selectedProduct: IProduct | null): void {
        this.selectedProductSource.next(selectedProduct);
    }

    getProducts(): Observable<IProduct[]> {
        if (this.products) {
            return of(this.products);
        }
        return this.http.get<IProduct[]>(this.productsUrl)
            .pipe(
                tap(data => console.log('All Products', JSON.stringify(data))),
                tap(data => this.products = data),
                catchError(this.handleError)
            );
    }

    getProduct(id: number): Observable<IProduct> {
        if (id === 0) {
            return of(this.initializeProduct());
        }
        if (this.products) {
            const foundItem = this.products.find(item => item.id === id);
            if (foundItem) {
                return of(foundItem);
            }
        }
        const url = `${this.productsUrl}/${id}`;
        return this.http.get<IProduct>(url)
            .pipe(
                tap(data => console.log('Single Product: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    saveProduct(product: IProduct): Observable<IProduct> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (product.id === 0) {
            return this.createProduct(product, headers);
        }
        return this.updateProduct(product, headers);
    }

    deleteProduct(id: number): Observable<IProduct> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete<IProduct>(url, { headers })
            .pipe(
                tap(data => console.log('deleteProduct: ' + id)),
                tap(data => {
                    const foundIndex = this.products.findIndex(item => item.id === id);
                    if (foundIndex > -1) {
                        this.products.splice(foundIndex, 1);
                        this.changeSelectedProduct(null);
                    }
                }),
                catchError(this.handleError)
            );
    }

    private createProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
        product.id = null;
        return this.http.post<IProduct>(this.productsUrl, product, { headers })
            .pipe(
                tap(data => console.log('createProduct: ' + JSON.stringify(data))),
                tap(data => {
                    // If the user selected to add before listing the products,
                    // The products won't yet be retrieved.
                    if (this.products) {
                        this.products.push(data);
                    }
                    this.changeSelectedProduct(data);
                }),
                catchError(this.handleError)
            );
    }

    private updateProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
        const url = `${this.productsUrl}/${product.id}`;
        return this.http.put<IProduct>(url, product, { headers })
            .pipe(
                tap(data => console.log('updateProduct: ' + product.id)),
                catchError(this.handleError)
            );
    }

    private initializeProduct(): IProduct {
        // Return an initialized object
        return {
            id: 0,
            productName: '',
            productCode: '',
            category: '',
            tags: [],
            releaseDate: '',
            price: 0,
            description: '',
            starRating: 0,
            imageUrl: ''
        };
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }

}

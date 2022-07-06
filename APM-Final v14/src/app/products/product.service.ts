import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';

import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private products?: IProduct[];

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
        tap(data => console.log('Single Product:', JSON.stringify(data))),
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
        tap(() => console.log('deleteProduct:', id)),
        // Delete the item from the cached list.
        tap(() => {
          if (this.products) {
            const foundIndex = this.products.findIndex(item => item.id === id);
            if (foundIndex > -1) {
              this.products.splice(foundIndex, 1);
              this.changeSelectedProduct(null);
            }
          }
        }),
        catchError(this.handleError)
      );
  }

  private createProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
    product.id = null;
    return this.http.post<IProduct>(this.productsUrl, product, { headers })
      .pipe(
        tap(createdProduct => console.log('createProduct:', JSON.stringify(createdProduct))),
        tap(createdProduct => {
          // Push the items to the cached list.
          // If the user selected to add before listing the products,
          // The products won't yet be cached.
          if (this.products) {
            this.products.push(createdProduct);
          }
          this.changeSelectedProduct(createdProduct);
        }),
        catchError(this.handleError)
      );
  }

  private updateProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<IProduct>(url, product, { headers })
      .pipe(
        // The put does *not* return the updated item.
        tap(() => console.log('updateProduct: ', product.id)),
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

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    console.log(err);
    if (err.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned: ${err.statusText}, error message is: ${err.error}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }

}

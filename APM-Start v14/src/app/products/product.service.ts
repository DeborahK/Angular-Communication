import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { catchError, Observable, of, tap, throwError } from 'rxjs';

import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<IProduct>(url)
      .pipe(
        tap(data => console.log('Data: ' + JSON.stringify(data))),
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
        tap(() => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  private createProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
    product.id = null;
    return this.http.post<IProduct>(this.productsUrl, product, { headers })
      .pipe(
        tap(createdProduct => console.log('createProduct: ' + JSON.stringify(createdProduct))),
        catchError(this.handleError)
      );
  }

  private updateProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<IProduct>(url, product, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
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

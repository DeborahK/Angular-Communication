# Changes:

## September 25, 2019: Added a folder for the final course code updated to Angular v8.

Did not modify the course content, only added update code for Angular v8.

List of changes:
- Update to Angular v8
  - Slight changes to boilerplate files such as tsLint and tsconfig
  - New (in v8) syntax for lazy loading:
    ```
     loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
    ```
  - New (in v7) syntax for registering a service with the application injector:
    ```
      @Injectable({ providedIn: 'root' })
    ```
  - New (in V8) flag for ViewChild (read more here: https://angular.io/guide/static-query-migration):
    ```
      @ViewChild(NgForm, { static: true }) editForm: NgForm;
    ```
  - Changed to the new (in v6) pipeable operator syntax for Observables:
    ```
            return this.http.get<IProduct[]>(this.productsUrl)
                        .pipe(
                            tap(data => console.log(JSON.stringify(data))),
                            catchError(this.handleError)
                        );
    ```
  - Changed `subscribe` to use a single parameter. The multiple parameter overloads are being depricated:
    ```
                .subscribe({
                next: product => this.onProductRetrieved(product),
                error: err => this.errorMessage = err
            });
    ```
  - Minor modifications to pass the new linter (removing extraneous data types, etc)
- Update to Bootstrap 4
  - Affected almost all HTML files
- Bootstrap 4 no longer has glyphs, changed to Font-Awesome
- Move of images to local assets folder (instead of third-party site)

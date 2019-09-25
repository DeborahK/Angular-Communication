# Angular-Communication
Materials for the "[Angular Component Communications](http://bit.ly/Angular-Communication)" course on Pluralsight.

`APM-Start`: The starter files set up for use in VSCode, WebStorm, or other editors. **Use this to code along with the course**. (Currently set to <i>Angular version 5 or higher</i>)

`APM-Final`: The completed files. Use this to see the completed solution from the course. (Currently set to <i>Angular version 5 or higher</i>)

`APM-Final v8`: The completed files. Use this to see the completed solution from the course. (Currently set to <i>Angular version 8 or higher</i>) List of changes:
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
  - Minor modifications to pass the new linter (removing extraneous data types, etc)
- Update to Bootstrap 4
  - Affected almost all HTML files
- Bootstrap 4 no longer has glyphs, changed to Font-Awesome
- Move of images to local assets folder (instead of third-party site)

`APM-FinalWithGetters`: The completed files using getters instead of Subject and BehaviorSubject to accomplish the same objective. Use this to see an alternate completed solution for this course. (Currently set to <i>Angular version 5 or higher</i>)

See the `README.md` file under each folder for details on installing and running the application.

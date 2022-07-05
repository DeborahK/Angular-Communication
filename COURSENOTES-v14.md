# Angular Component Communication Course Notes
The following are course notes when watching this course (done with **Angular v5**)
but coding along with **Angular v14**

##product-list.component.ts
- `@ViewChild` property requires a default value, use `?` to specify a default value of undefined.
  - CODE:
  ```
  @ViewChild(CriteriaComponent) filterComponent?: CriteriaComponent;
  ```
  - REASON: As of Angular v12, Angular is strongly typed by default and requires all variables to be initialized. That includes all @ViewChild/ViewChildren properties. Specifying a `?` sets the type to its type OR undefined. 

- `filterComponent` property must be checked for null or undefined before using.
  - CODE:
  ```
    if (this.filterComponent) {
      this.filterComponent.listFilter = this.productParameterService.filterBy;
    }
  ```
  - REASON: The `filterComponent` property has a default value of undefined, so that property must be checked for null or undefined before assigning to it.
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  pageTitle = 'Products';
  monthCount = 0;

    constructor() { }

    ngOnInit() {
    }

}

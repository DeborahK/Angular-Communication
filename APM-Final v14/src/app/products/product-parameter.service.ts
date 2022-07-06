import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductParameterService {
  showImage = false;
  filterBy = '';

  constructor() { }

}

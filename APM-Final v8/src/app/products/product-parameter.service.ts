import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductParameterService {
  showImage: boolean;
  filterBy: string;

  constructor() { }

}

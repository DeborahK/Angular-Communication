import {
  Component, OnInit, ViewChild, ElementRef, AfterViewInit,
  Input, OnChanges, SimpleChanges, EventEmitter, Output
} from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() displayDetail = false;
  @Input() hitCount = 0;
  hitMessage = '';
  @Output() valueChange: EventEmitter<string> =
    new EventEmitter<string>();

  // Get the element from the template to set focus
  @ViewChild('filterElement') filterElementRef?: ElementRef;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    // Only emit if the value was changed
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  constructor() { }

  ngAfterViewInit(): void {
    if (this.filterElementRef?.nativeElement) {
      this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits:' + this.hitCount;
    }
  }

  ngOnInit() {
  }

}

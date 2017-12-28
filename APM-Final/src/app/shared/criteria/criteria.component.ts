import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('filterElement') filterElementRef;

  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    (this.filterElementRef.nativeElement) &&
      this.filterElementRef.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits:' + this.hitCount;
    }
  }
}

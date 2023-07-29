import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoading } from '../store/app.selector';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  value = '';
  isLoadingValue$!: Observable<boolean>;

  constructor(public store: Store) {}

  ngOnInit() {
    this.isLoadingValue$ = this.store.select(selectIsLoading);
  }

  @Output()
  valueChangeKeyUp = new EventEmitter<string>();

  onValueChangeKeyUp() {
    return this.valueChangeKeyUp.emit(this.value);
  }
}

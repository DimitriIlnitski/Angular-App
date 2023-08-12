/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoading } from '../store/app.selector';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  searchForm!: FormGroup;
  isLoadingValue$!: Observable<boolean>;

  constructor(public store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.isLoadingValue$ = this.store.select(selectIsLoading);
    this.searchForm = this.fb.group({
      searchValue: [''],
    });
  }

  @Output()
  valueChangeKeyUp = new EventEmitter<string>();

  onValueChangeKeyUp() {
    this.valueChangeKeyUp.emit(this.searchForm.get('searchValue')!.value);
  }
}

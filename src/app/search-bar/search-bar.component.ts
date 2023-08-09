/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoading } from '../store/app.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  searchForm!: FormGroup;
  isLoadingValue$!: Observable<boolean>;

  constructor(public store: Store) {}

  ngOnInit() {
    this.isLoadingValue$ = this.store.select(selectIsLoading);
    this.searchForm = new FormGroup({
      searchValue: new FormControl(''),
    });
  }

  @Output()
  valueChangeKeyUp = new EventEmitter<string>();

  onValueChangeKeyUp() {
    console.log(this.searchForm.get('searchValue')!.value);
    return this.valueChangeKeyUp.emit(
      this.searchForm.get('searchValue')!.value
    );
  }

  submitForm() {
    if (this.searchForm.valid) {
      this.onValueChangeKeyUp();
    }
  }
}

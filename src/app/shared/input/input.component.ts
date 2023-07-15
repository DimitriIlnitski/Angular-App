import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { setSearchTerm } from 'src/app/store/app.actions';
import { selectIsLoading } from 'src/app/store/app.selector';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit, OnDestroy {
  @Input()
  labelText = '';
  @Input()
  requiredText = '';
  @Input()
  labelClass = '';
  @Input()
  placeholderText = '';
  @Input()
  inputClass = '';
  @Input()
  inputType = 'text';
  @Input()
  idInput = '';
  @Input()
  value = '';
  isLoadingValue = false;
  isLoadingValue$!: Observable<boolean>;
  subscription!: Subscription;

  constructor(public store: Store) {}

  ngOnInit() {
    this.isLoadingValue$ = this.store.select(selectIsLoading);
    this.subscription = this.isLoadingValue$.subscribe(
      (value) => (this.isLoadingValue = value)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @Output()
  valueChange = new EventEmitter<string>();

  onValueChange() {
    this.valueChange.emit(this.value);
  }

  onSearch() {
    this.store.dispatch(setSearchTerm({ value: this.value }));
  }

  isLoading() {
    return this.isLoadingValue;
  }
}

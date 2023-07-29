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
import { selectIsLoading } from 'src/app/store/app.selector';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
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
  isLoadingValue$!: Observable<boolean>;

  constructor(public store: Store) {}

  ngOnInit() {
    this.isLoadingValue$ = this.store.select(selectIsLoading);
  }

  @Output()
  valueChange = new EventEmitter<string>();

  @Output()
  valueChangeKeyUp = new EventEmitter<string>();

  onValueChange() {
    this.valueChange.emit(this.value);
  }

  onValueChangeKeyUp() {
    this.valueChangeKeyUp.emit(this.value);
  }
}

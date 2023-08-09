/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DateComponent),
      multi: true,
    },
  ],
})
export class DateComponent implements ControlValueAccessor, Validator {
  value = '';
  onChange: any = () => {};
  onTouch: any = () => {};
  disabled = false;

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
  createForm!: FormGroup;
  
  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;

    if (inputValue !== null) {
      this.value = inputValue;
      this.onChange(this.value);
      this.onTouch();
    }
  }

  validate(control: FormControl) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    return !datePattern.test(control.value) ? { isNotDateString: true } : null;
  }
}

/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  ],
})
export class DateComponent implements ControlValueAccessor {
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
}

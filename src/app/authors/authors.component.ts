/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DBAuthor } from '../interfaces/db-author.interface';
import { Observable, of } from 'rxjs';
import { CourseAuthor } from '../interfaces/course-author.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsComponent),
      multi: true,
    },
  ],
})
export class AuthorsComponent implements ControlValueAccessor {
  value = '';
  savedAuthorsList: CourseAuthor[] = [];

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
  authorsData: Observable<DBAuthor[]> = of([]);

  writeValue(value: string): void {
    this.savedAuthorsList.push();
    this.value = '';
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

  onKeyUp(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;

    if (inputValue !== null) {
      this.value = inputValue;
      this.onChange(this.savedAuthorsList);
      this.onTouch();
    }
  }
}

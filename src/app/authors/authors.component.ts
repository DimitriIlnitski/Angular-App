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
import { DBAuthor } from '../interfaces/db-author.interface';
import { Observable, of } from 'rxjs';
import { CourseAuthor } from '../interfaces/course-author.interface';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AuthorsComponent),
      multi: true,
    },
  ],
})
export class AuthorsComponent implements ControlValueAccessor, Validator {
  value = '';
  savedAuthorsList: CourseAuthor[] = [];
  faXmark = faXmark;

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
  @Input()
  createForm!: FormGroup;

  writeValue(courseAuthor: CourseAuthor[]): void {
    this.savedAuthorsList.push(...courseAuthor);
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

  onChangeInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;

    if (inputValue.trim().length !== 0) {
      const arrFromString = inputValue.split(' ');
      this.savedAuthorsList.push({
        id: Number(new Date().toISOString().replace(/\D/g, '').slice(0, 14)),
        name: arrFromString[0],
        lastName: arrFromString[1],
      });
      this.onChange(this.savedAuthorsList);
      this.onTouch();
      (event.target as HTMLInputElement).value = '';
    }
  }

  deleteAuthor(id: number) {
    this.savedAuthorsList = this.savedAuthorsList.filter(
      (author) => author.id !== id
    );
    this.onChange(this.savedAuthorsList);
  }

  validate(control: FormControl) {
    return control.value.length < 1 ? { lessThaOneAuthor: true } : null;
  }
}

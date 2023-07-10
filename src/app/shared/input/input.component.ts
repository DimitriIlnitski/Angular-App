import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { LoadingBlockService } from 'src/app/services/loading-block.service';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  constructor(
    public courseService: CourseService,
    public loadingBlockService: LoadingBlockService
  ) {}

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

  @Output()
  valueChange = new EventEmitter<string>();

  onValueChange() {
    this.valueChange.emit(this.value);
  }

  onSearch() {
    this.courseService.SearchCourses.next(this.value);
  }
}

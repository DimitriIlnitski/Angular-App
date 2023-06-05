import { Component, Input } from '@angular/core';
import { Course } from '../interfaces/course.interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  constructor() {
  this.courseList = [];
}
  @Input()
  courseList: Array<Course>;
}

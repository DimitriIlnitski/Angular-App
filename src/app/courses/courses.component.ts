import { Component, Input } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
  faPlus=faPlus;

  trackByCourseId(index: number, course: Course): string{
    return course.id;
  }
}

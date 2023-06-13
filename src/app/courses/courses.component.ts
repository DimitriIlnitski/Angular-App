import { Component, Input } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  @Input()
  courseList: Course[] = [];
  faPlus = faPlus;

  trackByCourseId(index: number, course: Course): string {
    return course.id;
  }

  handleClickLoadMore() {
    console.log('Load more');
  }

  showDeleteId(id: string) {
    console.log(id);
  }
}

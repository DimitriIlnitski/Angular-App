import { Component, OnInit } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCourses } from '../store/app.selector';
import { getList, removeCourse, setSearchTerm } from '../store/app.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  faPlus = faPlus;
  selectedCourses$!: Observable<Course[]>;

  constructor(public store: Store, private router: Router) {
    this.store.dispatch(getList({ setStartValue: 0 }));
  }

  ngOnInit() {
    this.selectedCourses$ = this.store.select(selectCourses);
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onValueChangeKeyUp(value: string) {
    this.store.dispatch(setSearchTerm({ value: value }));
  }

  addNewCourse(): void {
    this.router.navigate(['/courses/new']);
  }

  handleClickLoadMore() {
    this.store.dispatch(getList({ setStartValue: undefined }));
  }

  deleteCourse(id: string) {
    const decision = window.confirm(
      'Do you really want to delete this course?'
    );
    if (decision) {
      this.store.dispatch(removeCourse({ id: id }));
    }
  }
}

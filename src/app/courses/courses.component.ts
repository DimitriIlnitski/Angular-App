import { Component, OnInit } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { debounceTime, filter, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCourseAndStart, selectCourses, selectSearchTerm } from '../store/app.selector';
import {
  getList,
  removeCourse,
  setStartZeroAndDirectToGetList,
} from '../store/app.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  faPlus = faPlus;

  constructor(public store: Store, private router: Router) {}

  ngOnInit() {
    this.store.select(selectCourseAndStart).pipe(
      filter(({ start, courses }) => courses.length === 0 && start === 0),
      switchMap(() => {
        this.store.dispatch(setStartZeroAndDirectToGetList());
        return of(null);
      })
    );

    this.store.select(selectSearchTerm).pipe(
      filter((str: string) => str.length > 3 || str.length === 0),
      debounceTime(300),
      map((str: string) => {
        if (str.length === 0 || str.length >= 3) {
          this.store.dispatch(setStartZeroAndDirectToGetList());
        }
      })
    );
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  addNewCourse(): void {
    this.router.navigate(['/courses/new']);
  }

  handleClickLoadMore() {
    this.store.dispatch(getList());
  }

  deleteCourse(id: string) {
    const decision = window.confirm(
      'Do you really want to delete this course?'
    );
    if (decision) {
      this.store.dispatch(removeCourse({ id: id }));
    }
  }

  getCourses(){
    return this.store.select(selectCourses);
  }
}

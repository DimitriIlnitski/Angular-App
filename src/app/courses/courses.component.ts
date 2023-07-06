import { Component, OnInit } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ListFilterCourseNamePipe } from '../shared/pipes/list-filter-course-name.pipe';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { Observable, concat, concatAll, from, toArray } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> = from([]);
  searchTerm = '';
  faPlus = faPlus;

  constructor(
    private listFilterCourseNamePipe: ListFilterCourseNamePipe,
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.courses$ = this.courseService.getList();
    this.courseService.courses$ = this.courses$;
    // this.courses$.subscribe(course=>course.forEach(value=>console.log(value.id)))
  }

  trackByCourseId(index: number, course: Course): string {
    return String(course.id);
  }

  addNewCourse(): void {
    this.router.navigate(['/courses/new']);
  }

  handleClickLoadMore() {
    this.courses$ = concat(this.courses$, this.courseService.getList()).pipe(
      concatAll(),
      toArray()
    );
    this.courseService.courses$ = this.courses$;
  }

  deleteCourse(id: string) {
    const decision = window.confirm(
      'Do you really want to delete this course?'
    );
    if (decision) {
      this.courseService.removeItem(id).subscribe({
        next: () => {
          console.log(`Course #${id} have been deleted`);
          this.courseService.start = 0;
          this.courses$ = this.courseService.getList();
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  handleValueChange(value: string) {
    this.searchTerm = value;
  }

  filterArray() {
    this.courses$ = this.courseService.getList(this.searchTerm);
    this.courseService.courses$ = this.courses$;
  }
}

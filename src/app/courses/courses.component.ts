import { Component, OnInit } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  
  courses$: Observable<Course[]> | null = null;
  searchTerm = '';
  faPlus = faPlus;

  constructor(
    private courseService: CourseService,
    private router: Router,
  ) {}

  ngOnInit() {
    alert('COurses =====================Init');
    this.courses$ = this.courseService.courses$;
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {
    alert('COurses =====================End');
  }

  trackByCourseId(index: number, course: Course): string {
    return String(course.id);
  }

  addNewCourse(): void {
    this.router.navigate(['courses/new']);
  }

  handleClickLoadMore() {
    this.courseService.getList();
    console.log('Load more');
  }

  deleteCourse(id: string) {
    const decision = window.confirm(
      'Do you really want to delete this course?'
    );
    if (decision) {
      this.courseService.removeItem(id);
    }
  }

  handleValueChange(value: string) {
    this.searchTerm = value;
  }

  filterArray() {
    this.courseService.courses$?.subscribe({
      next: () => {
        const filteredCourses$ = this.courseService.getList(this.searchTerm);
        this.courses$ = filteredCourses$;
      },
      error: (e) =>
        console.log('faild to fetch courses in Courses component' + e.message),
    });
  }
}

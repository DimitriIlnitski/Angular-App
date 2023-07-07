import { Component, OnInit } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  faPlus = faPlus;

  constructor(
    public courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.courseService.getList().subscribe((fetchedData) => {
      this.courseService.courses = [
        ...this.courseService.courses,
        ...fetchedData,
      ];
      this.courseService.start + 3;
    });
  }

  trackByCourseId(index: number, course: Course): string {
    return String(course.id);
  }

  addNewCourse(): void {
    this.router.navigate(['/courses/new']);
  }

  handleClickLoadMore() {
    this.courseService.getList().subscribe((fetchedData) => {
      this.courseService.courses = [
        ...this.courseService.courses,
        ...fetchedData,
      ];
      this.courseService.start + 3;
    });
  }

  deleteCourse(id: string) {
    const decision = window.confirm(
      'Do you really want to delete this course?'
    );
    if (decision) {
      this.courseService.removeItem(id).subscribe({
        next: () => {
          console.log(`Course #${id} have been deleted`);
          this.courseService.courses = this.courseService.courses.filter(
            (course) => course.id !== Number(id)
          );
          this.courseService.start = 0;
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  handleValueChange(value: string) {
    this.courseService.searchTerm = value;
  }

  filterArray() {
    this.courseService.start=0;
    this.courseService.getList().subscribe((fetchedData) => {
      this.courseService.courses = [...fetchedData];
      this.courseService.start + 3;
    });
  }
}

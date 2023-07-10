import { Component, OnInit } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs';
import { LoadingBlockService } from '../services/loading-block.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  faPlus = faPlus;

  constructor(
    public courseService: CourseService,
    private router: Router,
    private loadingBlockService: LoadingBlockService
  ) {}

  ngOnInit() {
    if (
      this.courseService.courses.length === 0 &&
      this.courseService.start === 0
    ) {
      this.courseService.getList().subscribe({
        next: (fetchedData) => {
          this.courseService.courses.push(...fetchedData);
          this.courseService.start += 3;
          this.loadingBlockService.isLoading = false;
        },
        error: (e) => {
          this.loadingBlockService.isLoading = false;
          console.log(e);
        },
      });
    }

    this.courseService.SearchCourses.pipe(
      filter((str: string) => str.length > 3 || str.length === 0),
      debounceTime(300)
    ).subscribe({
      next: (str: string) => {
        this.courseService.searchTerm = str;
        if (str.length === 0 || str.length >= 3) {
          this.courseService.start = 0;
          this.courseService.getList().subscribe({
            next: (fetchedData) => {
              this.courseService.courses = [];
              this.courseService.courses.push(...fetchedData);
              this.courseService.start += 3;
              this.loadingBlockService.isLoading = false;
            },
            error: (e) => {
              this.loadingBlockService.isLoading = false;
              console.log(e);
            },
          });
        }
      },
    });
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  addNewCourse(): void {
    this.router.navigate(['/courses/new']);
  }

  handleClickLoadMore() {
    this.courseService.getList().subscribe({
      next: (fetchedData) => {
        this.courseService.courses.push(...fetchedData);
        this.loadingBlockService.isLoading = false;
        this.courseService.start += 3;
      },
      error: (e) => {
        this.loadingBlockService.isLoading = false;
        console.log(e);
      },
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
          this.loadingBlockService.isLoading = false;
        },
        error: (e) => {
         this.loadingBlockService.isLoading = false;
          console.log(e);
        },
      });
    }
  }
}

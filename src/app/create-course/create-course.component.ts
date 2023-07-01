import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { RouteParameterService } from '../services/route-parameter.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit, OnDestroy {
  titleValue = '';
  descriptionValue = '';
  durationValue = 0;
  dateValue = '';
  authorsValue = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private routeParameterService: RouteParameterService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id != undefined) {
      this.routeParameterService.setData(id.slice(1));
      const course = this.courseService.getItemById(id.slice(1));
      if (course != undefined) {
        this.titleValue = course.title;
        this.descriptionValue = course.description;
        this.durationValue = course.duration;
        this.dateValue = course.creationDate;
      }
    }
  }
  ngOnDestroy() {
    this.routeParameterService.setData(null);
  }
  
  dateInputHandler(date: string): string {
    return (this.dateValue = date);
  }
  durationInputHandler(duration: string): number {
    return (this.durationValue = parseInt(duration));
  }
  authorsInputHandler(authors: string): string {
    return (this.authorsValue = authors);
  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }
  save(): void {
    this.router.navigate(['/courses']);
  }
}

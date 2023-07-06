import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { RouteParameterService } from '../services/route-parameter.service';
import { Course } from '../interfaces/course.interface';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit, OnDestroy {
  nameValue = '';
  descriptionValue = '';
  lengthValue = 0;
  dateValue = '';
  authorsValue: any = '';
  courseValue!: Course;

  shouldEdit = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private routeParameterService: RouteParameterService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.routeParameterService.setData(id);
      this.courseService.getItemById(id).subscribe({
        next: (course) => {
          if (course) {
            this.nameValue = course.name;
            this.dateValue = course.date;
            this.lengthValue = course.length;
            this.descriptionValue = course.description;

            this.shouldEdit = true;
          }
        },
      });
    }
  }
  ngOnDestroy() {
    this.routeParameterService.setData(null);
  }

  dateInputHandler(date: string): string {
    return (this.dateValue = date);
  }
  durationInputHandler(duration: string): number {
    return (this.lengthValue = parseInt(duration));
  }
  authorsInputHandler(authors: string): string {
    return (this.authorsValue = authors);
  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }
  save(): void {
       if (!this.shouldEdit) {
         const newCourse: Course = {
           id: Math.floor(Math.random() * (20000 - 1000 + 1)) + 1000,
           name: this.nameValue,
           date: new Date().toISOString(),
           length: this.lengthValue,
           description: this.descriptionValue,
           authors: this.courseValue.authors,
           isTopRated: this.courseValue.isTopRated,
         };
         this.courseService.createCourse(newCourse);
         this.router.navigate(['courses']);
         return;
       }

       const updatedCourse: Course = {
         id: this.courseValue.id,
         name: this.nameValue,
         date: new Date().toISOString(),
         length: this.lengthValue,
         description: this.descriptionValue,
         authors: [
           {
             id: '5b7a84624010db4d640e0099',
             name: 'Vincent Doyle',
           },
         ],
         isTopRated: false,
       };
       this.courseService.updateItem(String(updatedCourse.id), updatedCourse);
       this.router.navigate(['courses']);
       return;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../interfaces/course.interface';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent implements OnInit {
  nameValue = '';
  descriptionValue = '';
  lengthValue = '';
  dateValue = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authorsValue: any = '';
  courseValue!: Course;

  shouldEdit = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      const course = this.courseService.getItemById(id);
      console.log(course);
      if (course) {
        this.nameValue = course.name;
        this.dateValue = course.date;
        this.lengthValue = String(course.length);
        this.descriptionValue = course.description;
        this.courseValue = course;
        this.shouldEdit = true;
      }
    }
  }

  dateInputHandler(date: string): string {
    console.log(date);
    return (this.dateValue = date);
  }
  durationInputHandler(duration: string): number {
    console.log(parseInt(duration));
    return Number((this.lengthValue = duration));
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
        length: Number(this.lengthValue),
        description: this.descriptionValue,
        authors: [
          {
            id: 5653,
            name: 'Leblanc',
          },
        ],
        isTopRated: true,
      };

      this.courseService.createCourse(newCourse).subscribe({
        next: () => {
          this.courseService.courses.unshift(newCourse);
          console.log(`Course #${newCourse.id} have been added successfully`);
          this.courseService.start = 0;
          this.router.navigate(['courses']);
        },
        error: (e) => {
          console.log(e);
        },
      });

      return;
    }

    const updatedCourse: Course = {
      id: this.courseValue.id,
      name: this.nameValue,
      date: new Date().toISOString(),
      length: Number(this.lengthValue),
      description: this.descriptionValue,
      authors: [
        {
          id: 5653,
          name: 'Leblanc',
        },
      ],
      isTopRated: false,
    };
    this.courseService
      .updateItem(String(updatedCourse.id), updatedCourse)
      .subscribe({
        next: () => {
          console.log(
            `Course #${updatedCourse.id} have been updated successfully`
          );
          this.courseService.start = 0;
          this.router.navigate(['courses']);
        },
        error: (e) => {
          console.log(e);
        },
      });
    return;
  }
}

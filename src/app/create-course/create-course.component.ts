import { Component } from '@angular/core';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent {
  titleValue = '';

  titleInputHandle(title: string): string {
    return title;
  }
  durationInputHandle(duration: string): number {
    return parseInt(duration);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class CreateCourseComponent {
  titleValue = '';
  descriptionValue = '';
  durationValue = 0;
  dateValue = '';
  authorsValue = '';

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
    console.log('Cancel');
  }
  save(): void {
    console.log('Save');
  }
}

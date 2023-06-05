import { Component, Input } from '@angular/core';
import { Course } from '../interfaces/course.interface';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent {
constructor(){
  this.courseItem = {
    id: 0,
    name: 'Empty',
    description: 'Empty',
    isTopRated: false,
    date: 'Empty',
    authors: [],
    length: 0, 
  }
}
@Input()
courseItem: Course;

}

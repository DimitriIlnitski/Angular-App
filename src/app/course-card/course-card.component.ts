import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import {
  faClock,
  faCalendar,
  faPen,
  faTrash,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent {
  @Input()
  courseItem: Course = {
    id: 'Empty',
    title: 'Empty',
    description: 'Empty',
    creationDate: 'Empty',
    duration: 0,
    isTopRated: false,
  };
  faClock = faClock;
  faCalendar = faCalendar;
  faPen = faPen;
  faTrash = faTrash;
  faStar = faStar;

  getRating(){
      return {
        'course-card__star--not-visible': !this.courseItem.isTopRated
      }
  }

  @Output()
  cardDeleteClick = new EventEmitter<string>();

  deleteClick() {
    this.cardDeleteClick.emit(this.courseItem.id);
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Course } from '../interfaces/course.interface';
import {
  faClock,
  faCalendar,
  faPen,
  faTrash,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {
  @Input()
  courseItem: Course = {
    id: 100,
    name: 'title',
    date: '2023-06-19',
    length: 125,
    description: 'description',
    authors: [],
    isTopRated: false,
  };
  faClock = faClock;
  faCalendar = faCalendar;
  faPen = faPen;
  faTrash = faTrash;
  faStar = faStar;
  constructor(private router: Router) {}

  @Output()
  cardDeleteClick = new EventEmitter<string>();

  editClick() {
    this.router.navigate([`courses`, this.courseItem.id]);
  }

  deleteClick() {
    this.cardDeleteClick.emit(String(this.courseItem.id));
  }
}

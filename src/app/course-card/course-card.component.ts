import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import {Helper} from '../../helpers/helper';
import { faClock, faCalendar, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
constructor(){
  this.courseItem = {
    id: 'Empty',
    title: 'Empty',
    description: 'Empty',
    creationDate: 'Empty',
    duration: 0, 
  }
}
@Input()
courseItem: Course;
faClock = faClock;
faCalendar = faCalendar;
faPen=faPen;
faTrash = faTrash;
formatedDate=''; 
formatedTime='';

deleteClick(){
  console.log(this.courseItem.id);
}

ngOnInit():void{
this.formatedTime = Helper.formatTime(this.courseItem.duration);
this.formatedDate = Helper.formatDate(this.courseItem.creationDate);
}
}

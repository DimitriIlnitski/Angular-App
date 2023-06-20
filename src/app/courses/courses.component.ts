import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ListFilterCourseNamePipe } from '../shared/pipes/list-filter-course-name.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  constructor(private listFilterCourseNamePipe: ListFilterCourseNamePipe) {}

  ngOnInit() {
    this.filteredCourseList = this.courseList;
  }

  @Input()
  courseList: Course[] = [];
  filteredCourseList: Course[] = [];
  searchTerm = '';
  faPlus = faPlus;

  trackByCourseId(index: number, course: Course): string {
    return course.id;
  }

  handleClickLoadMore() {
    console.log('Load more');
  }

  showDeleteId(id: string) {
    console.log(id);
  }

  handleValueChange(value: string) {
    this.searchTerm = value;
  }

  filterArray() {
    this.filteredCourseList = this.listFilterCourseNamePipe.transform(
      this.courseList,
      this.searchTerm
    );
  }
}

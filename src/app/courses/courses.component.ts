import { Component, Input, OnChanges } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ListFilterCourseNamePipe } from '../shared/pipes/list-filter-course-name.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnChanges {
  constructor(private listFilterCourseNamePipe: ListFilterCourseNamePipe) {
    this.filteredCourseList = this.courseList;
  }

  @Input()
  courseList: Course[] = [];
  searchTerm = '';
  filteredCourseList: Course[] = [];

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

  ngOnChanges() {
    this.filteredCourseList = this.listFilterCourseNamePipe.transform(
      this.courseList,
      this.searchTerm
    );
  }
}

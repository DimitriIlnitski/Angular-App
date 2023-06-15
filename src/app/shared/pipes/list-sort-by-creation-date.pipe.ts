import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/interfaces/course.interface';

@Pipe({
  name: 'listSortByCreationDate',
})
export class ListSortByCreationDatePipe implements PipeTransform {
  transform(courseList: Course[]): Course[] {
    return courseList.sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    );
  }
}

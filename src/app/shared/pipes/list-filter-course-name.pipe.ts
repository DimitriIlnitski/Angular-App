import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/interfaces/course.interface';

@Pipe({
  name: 'listFilterCourseName',
})
export class ListFilterCourseNamePipe implements PipeTransform {
  transform(courseList: Course[], searchTerm: string): Course[] {
    if (searchTerm.length > 0) {
      return courseList.filter((course: Course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }else {
      return courseList;
    }
  }
}

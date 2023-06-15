import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/interfaces/course.interface';

@Pipe({
  name: 'listFilterCourseName',
})
export class ListFilterCourseNamePipe implements PipeTransform {
  transform(courseList: Course[], searchTerm: string): Course[] {
    return courseList.filter((course: Course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

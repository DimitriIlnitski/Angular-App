import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  mockedArray = [
    {
      id: '8693',
      title: 'duis mollit reprehenderit ad',
      description:
        'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
      creationDate: '2023-06-26T04:39:24+00:00',
      duration: 157,
      isTopRated: true,
    },
    {
      id: '4980',
      title: 'magna excepteur aute deserunt',
      description:
        'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
      creationDate: '2023-06-10T02:02:36+00:00',
      duration: 207,
      isTopRated: true,
    },
    {
      id: '7935',
      title: 'magna excepteur aute deserunt',
      description:
        'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
      creationDate: '2023-09-21T04:39:24+00:00',
      duration: 117,
      isTopRated: false,
    },
  ];

  getList(): Course[] {
    return this.mockedArray;
  }
  createCourse(course: Course): void {
    this.mockedArray.push(course);
  }
  getItemById(id: string): Course | undefined {
    return this.mockedArray.find((course) => course.id === id);
  }
  updateItem(id: string, filedsToUpdate: object) {
    this.mockedArray = this.mockedArray.map((course) =>
      course.id === id ? { ...course, ...filedsToUpdate } : course
    );
  }
  removeItem(id: string): void {
    this.mockedArray = this.mockedArray.filter((course) => course.id != id);
  }
}

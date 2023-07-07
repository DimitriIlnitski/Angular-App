import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}
  courses: Course[] = [];
  start = 0;
  searchTerm = '';

  getList() {
    let params: HttpParams;
    if (this.searchTerm) {
      params = new HttpParams()
        .set('start', this.start)
        .set('count', 3)
        .set('sort', 'date')
        .set('textFragment', this.searchTerm);
    } else {
      params = new HttpParams()
        .set('start', this.start)
        .set('count', 3)
        .set('sort', 'date');
    }
    return this.http.get<Course[]>('http://localhost:3004/courses', {
      params,
    });
  }

  createCourse(course: Course) {
    return this.http.post('http://localhost:3004/courses', {
      course: course,
    });
  }

  getItemById(id: string): Course | undefined {
    return this.courses.find((course) => course.id === Number(id));
  }

  updateItem(id: string, filedsToUpdate: object) {
    return this.http.patch(
      `http://localhost:3004/courses/${id}`,
      filedsToUpdate
    );
  }

  removeItem(id: string) {
    return this.http.delete(`http://localhost:3004/courses/${id}`);
  }
}

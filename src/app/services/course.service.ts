import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  courses$: Observable<Course[]> = from([]);
  start = 0;

  getList(textFragment = '') {
    console.log(textFragment);
    const params = new HttpParams()
      .set('start', this.start)
      .set('count', 3)
      .set('sort', 'date')
      .set('textFragment', textFragment);
    this.courses$ = this.http.get<Course[]>('http://localhost:3004/courses', {
      params,
    });
    this.start = this.start + 3;
    return this.courses$;
  }

  createCourse(course: Course) {
    this.http
      .post('http://localhost:3004/courses', {
        course: course,
      })
      .subscribe({
        next: () => {
          console.log(`Course #${course.id} have been added successfully`);
          this.start = 0;
          this.getList();
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  getItemById(id: string): Observable<Course | undefined> {
    return this.courses$?.pipe(
      map((courses: Course[]) =>
        courses.find((course) => course.id === Number(id))
      )
    );
  }

  updateItem(id: string, filedsToUpdate: object) {
    this.http
      .patch(`http://localhost:3004/courses/${id}`, filedsToUpdate)
      .subscribe({
        next: () => {
          console.log(`Course #${id} have been updated successfully`);
          this.start = 0;
          this.getList();
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  removeItem(id: string) {
    return this.http.delete(`http://localhost:3004/courses/${id}`)
  }
}

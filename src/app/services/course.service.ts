import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  courses$!: Observable<Course[]>;
  start = 0;

  getList(textFragment?: string): Observable<Course[]> {
    const params = new HttpParams()
      .set('start', this.start)
      .set('count', 5)
      .set('sort', 'asc')
      .set('textFragment', `${textFragment}`);
    this.courses$ = this.http.get<Course[]>('http://localhost:3004/courses', {
      params,
    });
    this.start = this.start + 5;
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
          this.getList();
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  removeItem(id: string): void {
    this.http.delete(`http://localhost:3004/courses/${id}`).subscribe({
      next: () => {
        console.log(`Course #${id} have been deleted`);
        this.getList();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}

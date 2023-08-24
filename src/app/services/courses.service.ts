import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getList(start: number, searchTerm: string): Observable<Course[]> {
    const params: HttpParams = new HttpParams()
      .set('start', start)
      .set('count', 3)
      .set('sort', 'date')
      .set('textFragment', searchTerm);

    return this.http.get<Course[]>(`${this.apiUrl}/courses`, {
      params,
    });
  }

  createCourse(course: Course) {
    return this.http.post<Course>(`${this.apiUrl}/courses`, course);
  }

  updateCourse(updatedCourse: Course) {
    return this.http.patch<Course>(
      `${this.apiUrl}/courses/${updatedCourse.id}`,
      updatedCourse
    );
  }

  removeCourse(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }
}

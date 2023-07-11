import { Injectable } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoadingBlockService } from './loading-block.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  SearchCourses: Subject<string> = new Subject<string>();

  courses: Course[] = [];
  start = 0;
  searchTerm = '';
  apiUrl = '';

  constructor(
    private http: HttpClient,
    private loadingBlockService: LoadingBlockService
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getList() {
    this.loadingBlockService.isLoading = true;
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
    return this.http.get<Course[]>(`${this.apiUrl}/courses`, {
      params,
    });
  }

  createCourse(course: Course) {
    this.loadingBlockService.isLoading = true;
    return this.http.post<Course>(`${this.apiUrl}/courses`, course);
  }

  getItemById(id: string) {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  updateItem(updatedCourse: Course) {
    this.loadingBlockService.isLoading = true;
    return this.http.patch<Course>(
      `${this.apiUrl}/courses/${updatedCourse.id}`,
      updatedCourse
    );
  }

  removeItem(id: string) {
    this.loadingBlockService.isLoading = true;
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }

}

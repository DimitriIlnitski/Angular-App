import { HttpClient, HttpParams } from '@angular/common/http';
import { Token } from '../interfaces/token.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginRequest } from '../interfaces/login-request.interface';
import { User } from '../interfaces/user.interface';
import { Store } from '@ngrx/store';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = '';

  constructor(private http: HttpClient, private store: Store) {
    this.apiUrl = environment.apiUrl;
  }

  //Auth
  loginPost(loginData: LoginRequest): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/auth/login`, loginData);
  }

  getUserInfo(token: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/userinfo`, {
      token: token,
    });
  }

  //Courses

  getList(start: number, searchTerm: string): Observable<Course[]> {
    let params: HttpParams;
    if (searchTerm) {
      params = new HttpParams()
        .set('start', start)
        .set('count', 3)
        .set('sort', 'date')
        .set('textFragment', searchTerm);
    } else {
      params = new HttpParams()
        .set('start', start)
        .set('count', 3)
        .set('sort', 'date');
    }
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

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Course } from '../interfaces/course.interface';
import { DBAuthor } from '../interfaces/db-author.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAuthors(): Observable<DBAuthor[]> {
    return this.http.get<DBAuthor[]>(`${this.apiUrl}/authors`);
  }
}

import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Token } from '../interfaces/token.interface';
import { Observable, of, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request.interface';
import { CourseService } from './course.service';
import { environment } from '../environments/environments';
import { LoadingBlockService } from './loading-block.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';
  apiUrl = '';

  userDetails: Observable<string> = of('');

  constructor(
    private http: HttpClient,
    private courseService: CourseService,
    private loadingBlockService: LoadingBlockService
  ) {
    const token = localStorage.getItem('token');
    this.token = token ? JSON.parse(token) : '';
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    this.userDetails = of(user?.name?.first ?? 'Unknown');
    this.apiUrl = environment.apiUrl;
  }

  login(loginData: LoginRequest): Observable<Token> {
    this.loadingBlockService.isLoading = true;
    return this.http.post<Token>(`${this.apiUrl}/auth/login`, loginData).pipe(
      tap((response) => {
        this.token = response.token;
        localStorage.setItem('token', JSON.stringify(response.token));
        console.log('Login successful');
        this.loadingBlockService.isLoading = false;
        this.getUserInfo();
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.token = '';
    this.userDetails = of('');
    this.courseService.courses = [];
    this.courseService.start = 0;
    this.courseService.searchTerm = '';
    console.log(`User have been deleted`);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getUserInfo() {
    this.loadingBlockService.isLoading = true;
    return this.http
      .post<User>(`${this.apiUrl}/auth/userinfo`, {
        token: this.token,
      })
      .subscribe({
        next: (user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userDetails = of(user.name?.first ?? 'Unknown');
          this.loadingBlockService.isLoading = false;
          console.log('User details received successfully');
        },
        error: (e) => {
          console.log(e);
          this.loadingBlockService.isLoading = false;
        },
      });
  }

  getToken(): string {
    return this.token;
  }
}

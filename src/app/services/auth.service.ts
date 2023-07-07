import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Token } from '../interfaces/token.interface';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';
  public userDetails = '';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.token = token ? JSON.parse(token) : '';
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    this.userDetails = user.name.first;
  }

  login(loginData: LoginRequest): Observable<Token> {
    return this.http
      .post<Token>('http://localhost:3004/auth/login', loginData)
      .pipe(
        tap((response) => {
          this.token = response.token;
          localStorage.setItem('token', JSON.stringify(response.token));
          console.log('Login successful');
          this.getUserInfo();
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.token = '';
    console.log(`User have been deleted`);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getUserInfo() {
    return this.http
      .post<User>('http://localhost:3004/auth/userinfo', {
        token: this.token,
      })
      .subscribe({
        next: (user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userDetails = `${user.name.first}`;
        },
        error: (e) => {
          console.log(e);
        },
      });
  }

  getToken(): string {
    return this.token;
  }
}

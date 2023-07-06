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

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.token = token ? JSON.parse(token) : null;
  }

  login(loginData: LoginRequest): Observable<Token> {
    return this.http
      .post<Token>('http://localhost:3004/auth/login', loginData)
      .pipe(
        tap((response) => {
          this.token = response.token;
          localStorage.setItem('token', JSON.stringify(response.token));
          console.log('Login successful');
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
      .post<User>('http://localhost:3004/auth/userinfo', { token: this.token })
      
  }

  getToken(): string {
    return this.token;
  }
}

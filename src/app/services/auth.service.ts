import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../interfaces/login-request.interface';
import { Token } from '../interfaces/token.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '58ebfdf7ec92657b493b24da';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.token = token ? JSON.parse(token) : null;
  }

  login(loginData: LoginRequest): Observable<Token> {
    return this.http
      .post<Token>('http://localhost:3004/auth/login', loginData)
      .pipe(
        tap((response) => {
          alert('Pipeeeeeeeeeeeeeeeeeeeeeeeeee---------start');
          this.token = response.token;
          localStorage.setItem('token', JSON.stringify(response.token));
          console.log('Login successful');
          alert('Pipeeeeeee--------------------------end');
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
    this.http
      .post<User>('http://localhost:3004/auth/userinfo', { token: this.token })
      .subscribe({
        next: (respond) => {
          localStorage.setItem('user', JSON.stringify(respond));
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

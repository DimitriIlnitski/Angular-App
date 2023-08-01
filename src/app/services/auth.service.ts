import { HttpClient } from '@angular/common/http';
import { Token } from '../interfaces/token.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginRequest } from '../interfaces/login-request.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '';

  constructor(private http: HttpClient) {
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
}

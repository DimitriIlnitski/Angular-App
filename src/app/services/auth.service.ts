import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';

  constructor() {
    const token = localStorage.getItem('token');
    this.token = token ? JSON.parse(token) : null;
  }

  login(loginData: { email: string; password: string }): void {
    if (loginData) {
      const fakeUser: User = {
        id: 1,
        name: 'name',
        lastName: 'lastName',
      };
      const fakeToken = 'fakeToken';
      localStorage.setItem('token', JSON.stringify(fakeToken));
      localStorage.setItem('user', JSON.stringify(fakeUser));
      this.token = fakeToken;
    }
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
  getUserInfo(): User | null {
    const user = localStorage.getItem('user');
    return user ? (JSON.parse(user) as User) : null;
  }
}

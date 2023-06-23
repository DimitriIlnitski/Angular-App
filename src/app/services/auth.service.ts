import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = '';

  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.token = JSON.parse(user).token;
    }
  }

  login(loginData: { email: string; password: string }): void {
    if (loginData) {
      const fakeUser: User = {
        id: 1,
        name: 'name',
        lastName: 'lastName',
        token: 'token',
      };
      localStorage.setItem('user', JSON.stringify(fakeUser));
    }
  }
  logout(): void {
    localStorage.removeItem('user');
    this.token = '';
    console.log(`User have been deleted`);
  }
  isAuthenticated(): boolean {
    return !!this.token;
  }
  getUserInfo(): User | undefined {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return;
  }
}

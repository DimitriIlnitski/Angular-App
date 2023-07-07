import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { Token } from '../interfaces/token.interface';
import { LoginRequest } from '../interfaces/login-request.interface';
import { User } from '../interfaces/user.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('logout', () => {
    it('should remove user and token from local storage', () => {
      localStorage.setItem('user', 'fake-user');
      localStorage.setItem('token', 'fake-token');

      service.logout();

      expect(localStorage.getItem('user')).toBeFalsy();
      expect(localStorage.getItem('token')).toBeFalsy();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if the token exists', () => {
      service['token'] = 'fake-token';
      const isAuthenticated = service.isAuthenticated();
      expect(isAuthenticated).toBe(true);
    });
  });

  describe('getToken', () => {
    it('should return the stored token', () => {
      service['token'] = 'fake-token';
      const token = service.getToken();
      expect(token).toBe('fake-token');
    });
  });
});

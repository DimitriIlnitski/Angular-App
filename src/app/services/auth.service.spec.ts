import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Token } from '../interfaces/token.interface';
import { LoginRequest } from '../interfaces/login-request.interface';
import { CourseService } from './course.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let courseService: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, CourseService],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    courseService = TestBed.inject(CourseService);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should login and set token and user details', () => {
    const loginData: LoginRequest = { login: 'test', password: 'password' };
    const tokenResponse: Token = { token: 'fakeToken' };
    const userResponse = {
      id: 1,
      token: 'fakeToken',
      name: { first: 'John', last: 'Doe' },
      login: 'test',
      password: 'password',
    };

    authService.login(loginData).subscribe();

    const loginRequest = httpMock.expectOne('http://localhost:3004/auth/login');
    expect(loginRequest.request.method).toBe('POST');
    loginRequest.flush(tokenResponse);

    const userInfoRequest = httpMock.expectOne(
      'http://localhost:3004/auth/userinfo'
    );
    expect(userInfoRequest.request.method).toBe('POST');
    userInfoRequest.flush(userResponse);

    expect(authService.getToken()).toBe(tokenResponse.token);
    expect(localStorage.getItem('token')).toBe(
      JSON.stringify(tokenResponse.token)
    );
    expect(authService.userDetails).toBe(userResponse.name.first);
    expect(localStorage.getItem('user')).toBe(JSON.stringify(userResponse));
  });

  it('should logout and clear user details and token', () => {
    authService.logout();

    expect(authService.getToken()).toBe('');
    expect(localStorage.getItem('token')).toBeNull();
    expect(authService.userDetails).toBe('');
    expect(localStorage.getItem('user')).toBeNull();
    expect(courseService.courses).toEqual([]);
    expect(courseService.start).toBe(0);
    expect(courseService.searchTerm).toBe('');
  });

  it('should return false if token is not available', () => {
    expect(authService.isAuthenticated()).toBe(false);
  });
});

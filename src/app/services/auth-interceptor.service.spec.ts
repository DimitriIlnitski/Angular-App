import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthInterceptorService } from './auth-interceptor.service';

describe('AuthInterceptorService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header with token if token is available', () => {
    const token = 'dummy-token';
    spyOn(authService, 'getToken').and.returnValue(token);

    httpClient.get('/api/data').subscribe();

    const httpRequest = httpMock.expectOne('/api/data');
    expect(httpRequest.request.headers.has('Authorization')).toBe(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(token);
  });

  it('should not add Authorization header if token is not available', () => {
    spyOn(authService, 'getToken').and.returnValue('');

    httpClient.get('/api/data').subscribe();

    const httpRequest = httpMock.expectOne('/api/data');
    expect(httpRequest.request.headers.has('Authorization')).toBe(false);
  });
});

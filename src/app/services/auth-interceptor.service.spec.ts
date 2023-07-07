import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from './auth.service';

describe('AuthInterceptorService', () => {
  let service: AuthInterceptorService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        AuthInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(AuthInterceptorService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add Authorization header if token exists', () => {
    const token = 'token';
    spyOn(service['authService'], 'getToken').and.returnValue(token);

    const fakeUrl = 'https://example.com/api';
    const fakeResponse = { data: 'response' };

    httpClient.get(fakeUrl).subscribe((response) => {
      expect(response).toEqual(fakeResponse);
    });

    const httpRequest = httpMock.expectOne(fakeUrl);
    expect(httpRequest.request.headers.has('Authorization')).toBe(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(token);
    httpRequest.flush(fakeResponse);
  });

  it('should pass through the request if token exists', () => {
    const token = 'token';
    spyOn(service['authService'], 'getToken').and.returnValue(token);

    const fakeUrl = 'https://example.com/api';
    const fakeResponse = { data: 'response' };

    httpClient.get(fakeUrl).subscribe((response) => {
      expect(response).toEqual(fakeResponse);
    });

    const httpRequest = httpMock.expectOne(fakeUrl);
    expect(httpRequest.request.headers.has('Authorization')).toBe(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(token);
    httpRequest.flush(fakeResponse);
  });
});

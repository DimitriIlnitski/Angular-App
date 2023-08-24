/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectToken } from '../store/app.selector';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token$ = this.store.select(selectToken);
    return token$.pipe(
      switchMap((token) => {
        if (token) {
          const modifiedRequest = request.clone({
            headers: request.headers.append('Authorization', token),
          });
          return next.handle(modifiedRequest);
        }
        return next.handle(request);
      })
    );
  }
}

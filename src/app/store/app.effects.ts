import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import {
  mergeMap,
  tap,
  map,
  catchError,
  throwError,
  switchMap,
  filter,
  debounceTime,
  exhaustMap,
} from 'rxjs';
import * as AppActions from './app.actions';

import { Store } from '@ngrx/store';
import { selectFetchParams } from './app.selector';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.login),
      exhaustMap(({ login, password }) =>
        this.dataService.loginPost({ login, password }).pipe(
          tap((response) => {
            const token: string = response.token;
            localStorage.setItem('token', JSON.stringify(token));
            console.log('Login successful');
          }),
          map((response) => {
            const token: string = response.token;
            console.log('Login completed');
            return AppActions.loginSuccess({ token });
          })
        )
      )
    );
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loginSuccess),
      map(({ token }) => {
        console.log('Login was successfull');
        return AppActions.getUserInfo({ token });
      })
    );
  });

  getUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.getUserInfo),
      exhaustMap(({ token }) => {
        return this.dataService.getUserInfo(token).pipe(
          tap((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            console.log('User details received successfully');
            this.router.navigate(['courses']);
          }),
          map((user) => AppActions.getUserInfoSuccess({ user })),
          tap(() => {
            this.router.navigate(['courses']);
          })
        );
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.logout),
      map(() => AppActions.logoutSuccess()),
      tap(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        console.log(`User have been logout`);
        this.router.navigate(['login']);
      })
    );
  });

  getList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.getList),
      concatLatestFrom(() => this.store.select(selectFetchParams)),
      switchMap(([, { start, searchTerm }]) =>
        this.dataService.getList(start, searchTerm).pipe(
          map((courses) => AppActions.getListSuccess({ courses })),
          catchError((error) => {
            console.error('An error occurred in app effects:', error);
            return throwError(error);
          })
        )
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.createCourse),
      mergeMap((newCourse) =>
        this.dataService.createCourse(newCourse).pipe(
          map(() => AppActions.getList()),
          tap(() => {
            console.log(`Course #${newCourse.id} have been added successfully`);
            this.router.navigate(['courses']);
          })
        )
      )
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.updateCourse),
      mergeMap((updatedCourse) =>
        this.dataService.updateCourse(updatedCourse).pipe(
          map(() => AppActions.getList()),
          tap(() => {
            `Course #${updatedCourse.id} have been updated successfully`;
            this.router.navigate(['courses']);
          })
        )
      )
    );
  });
  removeCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.removeCourse),
      mergeMap(({ id }) =>
        this.dataService.removeCourse(id).pipe(
          tap(() => `Course #${id} have been updated successfully`),
          map(() => AppActions.getList())
        )
      )
    );
  });

  setSearchTerm$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.setSearchTerm),
      filter(({ value }) => value.length > 3 || value.length === 0),
      debounceTime(300),
      map(() => AppActions.setStartZeroAndDirectToGetList())
    );
  });

  setStartZero$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.setStartZeroAndDirectToGetList),
      map(() => AppActions.getList()),
      tap(() => this.router.navigate(['courses']))
    );
  });
}

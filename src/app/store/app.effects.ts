import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { mergeMap, tap, concatMap, map, catchError, throwError } from 'rxjs';
import * as AppActions from './app.actions';
import { DataService } from '../services/data.service';
import { Store } from '@ngrx/store';
import { selectFetchParams } from './app.selector';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.login),
      mergeMap((LoginData) =>
        this.dataService.loginPost(LoginData).pipe(
          tap((response) => {
            const token: string = response.token;
            localStorage.setItem('token', JSON.stringify(token));
            console.log('Login successful');
          }),
          concatMap((response) => {
            const token: string = response.token;
            return [
              AppActions.loginSuccess({ token }),
              AppActions.getUserInfo({ token }),
            ];
          })
        )
      )
    );
  });

  getUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.getUserInfo),
      mergeMap(({ token }) =>
        this.dataService.getUserInfo(token).pipe(
          tap((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            console.log('User details received successfully');
          }),
          map((user) => AppActions.getUserInfoSuccess({ user }))
        )
      )
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.logout),
      tap(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        console.log(`User have been deleted`);
      }),
      map(() => AppActions.logoutSuccess())
    );
  });

  getList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.getList),
      concatLatestFrom(() => this.store.select(selectFetchParams)),
      mergeMap(([, { start, searchTerm }]) =>
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
          tap(() =>
            console.log(`Course #${newCourse.id} have been added successfully`)
          ),
          map(() => AppActions.getList())
        )
      )
    );
  });

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.updateCourse),
      mergeMap((updatedCourse) =>
        this.dataService.updateCourse(updatedCourse).pipe(
          tap(
            () => `Course #${updatedCourse.id} have been updated successfully`
          ),
          map(() => AppActions.getList())
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

  setStartZero$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.setStartAndDirectToGetList),
      map(() => AppActions.getList())
    );
  });
}

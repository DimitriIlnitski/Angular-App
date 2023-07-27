import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import {
  mergeMap,
  tap,
  map,
  catchError,
  throwError,
  switchMap,
  debounceTime,
} from 'rxjs';
import * as AppActions from './app.actions';

import { Store } from '@ngrx/store';
import { selectFetchParams } from './app.selector';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class AppEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store,
    private router: Router
  ) {}

  loginEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loginTo),
      switchMap(({ login, password }) => {
        return this.dataService.loginPost({ login, password }).pipe(
          tap(({ token }) => {
            localStorage.setItem('token', JSON.stringify(token));
            console.log('fetching of token successful');
          }),
          map(({ token }) => {
            console.log('Login success action dispatched');
            return AppActions.loginSuccess({ token });
          })
        );
      })
    );
  });

  loginSuccessEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loginSuccess),
      map(({ token }) => {
        console.log('Login was successfull');
        return AppActions.getUserInfo({ token });
      })
    );
  });

  getUserInfoEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.getUserInfo),
      switchMap(({ token }) => {
        return this.dataService.getUserInfo(token).pipe(
          tap((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            console.log('User details received successfully');
          }),
          map((user) => AppActions.getUserInfoSuccess({ user })),
          tap(() => {
            this.router.navigate(['courses']);
          })
        );
      })
    );
  });

  logoutEffect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AppActions.logout),
        tap(() => {
          // localStorage.removeItem('user');
          // localStorage.removeItem('token');
          localStorage.clear();
          console.log(`User have been logout`);
          this.router.navigate(['login']);
        })
      );
    },
    { dispatch: false }
  );

  getListEffect$ = createEffect(() => {
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

  createCourseEffect$ = createEffect(() => {
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

  updateCourseEffect$ = createEffect(() => {
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
  removeCourseEffect$ = createEffect(() => {
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

  returnToCOursesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.returnToCourses),
      map(() => {
        return AppActions.getList();
      }),
      tap(() => {
        this.router.navigate(['courses']);
      })
    );
  });

  setSearchTermEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.setSearchTerm),
      debounceTime(300),
      map(() => {
        return AppActions.getList();
      })
    );
  });
}

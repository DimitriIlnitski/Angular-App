import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../interfaces/user.interface';
import { Course } from '../interfaces/course.interface';
import { AppState } from '../interfaces/app-state.interface';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectToken = createSelector(
  selectAppState,
  (state: { token: string }) => state.token
);

export const selectUser = createSelector(
  selectAppState,
  (state: { user: User }) => state.user
);

export const selectUserDetails = createSelector(
  selectUser,
  (user: User) => user?.name?.first
);

export const selectCourses = createSelector(
  selectAppState,
  (state: { courses: Course[] }) => state.courses
);

export const selectStart = createSelector(
  selectAppState,
  (state: { start: number }) => state.start
);

export const selectSearchTerm = createSelector(
  selectAppState,
  (state: { searchTerm: string }) => state.searchTerm
);

export const selectIsLoading = createSelector(
  selectAppState,
  (state: { isLoading: boolean }) => state.isLoading
);

export const selectItemById = (id: number) =>
  createSelector(selectAppState, (state: { courses: Course[] }) =>
    state.courses.find((course) => course.id === id)
  );

export const selectFetchParams = createSelector(
  selectAppState,
  (state: AppState) => ({
    start: state.start,
    searchTerm: state.searchTerm,
  })
);

export const selectCourseAndStart = createSelector(
  selectAppState,
  (state: AppState) => ({
    start: state.start,
    courses: state.courses,
  })
);

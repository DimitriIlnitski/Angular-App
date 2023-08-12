import { createAction, props } from '@ngrx/store';
import { CourseAuthor } from 'src/app/interfaces/course-author.interface';
import { Course } from 'src/app/interfaces/course.interface';
import { User } from 'src/app/interfaces/user.interface';

export enum AppActions {
  loginTo = '[Auth] Login',
  loginSuccess = '[Auth] Login Success',
  logout = '[Auth] Logout',
  getUserInfo = '[Auth] Get User Info',
  getUserInfoSuccess = '[Auth] Get User Info Success',
  getList = '[Courses] Get List',
  getListSuccess = '[Courses] Get List Success',
  createCourse = '[Courses] Create Course',
  updateCourse = '[Courses] Update Course',
  removeCourse = '[Courses] Remove Course',
  returnToCourses = '[Courses] Return To Courses',
  setSearchTerm = '[Courses] Set Search Term',
}

//=================Auth Actions===================
export const loginTo = createAction(
  AppActions.loginTo,
  props<{ login: string; password: string }>()
);
export const loginSuccess = createAction(
  AppActions.loginSuccess,
  props<{ token: string }>()
);
//----------------------------------
export const logout = createAction(AppActions.logout);
//----------------------------------

export const getUserInfo = createAction(
  AppActions.getUserInfo,
  props<{ token: string }>()
);

export const getUserInfoSuccess = createAction(
  AppActions.getUserInfoSuccess,
  props<{ user: User }>()
);

//Courses Actions
export const getList = createAction(AppActions.getList);

export const getListSuccess = createAction(
  AppActions.getListSuccess,
  props<{ courses: Course[] }>()
);

//--------------------------

export const createCourse = createAction(
  AppActions.createCourse,
  props<{
    id: number;
    name: string;
    date: string;
    length: number;
    description: string;
    authors: CourseAuthor[];
    isTopRated: boolean;
  }>()
);
//--------------------------------
export const updateCourse = createAction(
  AppActions.updateCourse,
  props<{
    id: number;
    name: string;
    date: string;
    length: number;
    description: string;
    authors: CourseAuthor[];
    isTopRated: boolean;
  }>()
);

//-------------------------------------
export const removeCourse = createAction(
  AppActions.removeCourse,
  props<{ id: string }>()
);
//----------------------------------------
export const returnToCourses = createAction(AppActions.returnToCourses);
//----------------------------------------
export const setSearchTerm = createAction(
  AppActions.setSearchTerm,
  props<{ value: string }>()
);

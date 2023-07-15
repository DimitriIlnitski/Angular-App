import { createAction, props } from '@ngrx/store';
import { Author } from 'src/app/interfaces/author.interface';
import { Course } from 'src/app/interfaces/course.interface';
import { User } from 'src/app/interfaces/user.interface';

//=================Auth Actions===================
export const login = createAction(
  '[Auth] Login',
  props<{ login: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);

//----------------------------------
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
//----------------------------------

export const getUserInfo = createAction(
  '[Auth] Get User Info',
  props<{ token: string }>()
);

export const getUserInfoSuccess = createAction(
  '[Auth] Get User Info Success',
  props<{ user: User }>()
);

//Courses Actions
export const getList = createAction('[Courses] Get List');

export const getListSuccess = createAction(
  '[Auth] Get List Success',
  props<{ courses: Course[] }>()
);

//--------------------------

export const createCourse = createAction(
  '[Courses] Create Course',
  props<{
    id: number;
    name: string;
    date: string;
    length: number;
    description: string;
    authors: Author[];
    isTopRated: boolean;
  }>()
);
//--------------------------------
export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{
    id: number;
    name: string;
    date: string;
    length: number;
    description: string;
    authors: Author[];
    isTopRated: boolean;
  }>()
);

//-------------------------------------
export const removeCourse = createAction(
  '[Courses] Remove Course',
  props<{ id: string }>()
);

//----------------------------------------

export const setStartZeroAndDirectToGetList = createAction(
  '[Courses] Set Start And Direct To Get List'
);

export const setSearchTerm = createAction(
  '[Courses] Set Search Term',
  props<{ value: string }>()
);

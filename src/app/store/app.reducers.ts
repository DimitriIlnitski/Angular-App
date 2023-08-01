import { Action, createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { AppState } from 'src/app/interfaces/app-state.interface';

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

export const initialState: AppState = {
  token: storedToken !== null ? storedToken : '',
  user:
    storedUser !== null
      ? JSON.parse(storedUser)
      : {
          id: 0,
          token: '',
          name: {
            first: '',
            last: '',
          },
          login: '',
          password: '',
        },
  courses: [],
  start: 0,
  searchTerm: '',
  isLoading: false,
};

const _appReducer = createReducer(
  initialState,
  on(AppActions.loginTo, (state): AppState => ({ ...state, isLoading: true })),
  on(
    AppActions.loginSuccess,
    (state, { token }): AppState => ({ ...state, token, isLoading: false })
  ),
  //---------------------------------------------
  on(
    AppActions.getUserInfo,
    (state): AppState => ({ ...state, isLoading: true })
  ),
  on(
    AppActions.getUserInfoSuccess,
    (state, { user }): AppState => ({ ...state, user, isLoading: false })
  ),
  //---------------------------------------------
  on(
    AppActions.logout,
    (): AppState => ({
      ...{
        token: '',
        user: {
          id: 0,
          token: '',
          name: {
            first: '',
            last: '',
          },
          login: '',
          password: '',
        },
        courses: [],
        start: 0,
        searchTerm: '',
        isLoading: false,
      },
    })
  ),
  //---------------------------------------------
  on(AppActions.getList, (state): AppState => ({ ...state, isLoading: true })),
  on(
    AppActions.getListSuccess,
    (state, { courses }): AppState => ({
      ...state,
      courses: [...state.courses, ...courses],
      isLoading: false,
      start: state.start + 3,
    })
  ),
  //---------------------------------------------
  on(
    AppActions.createCourse,
    (state): AppState => ({ ...state, isLoading: true, start: 0, courses: [] })
  ),
  //---------------------------------------------
  on(
    AppActions.updateCourse,
    (state): AppState => ({ ...state, isLoading: true, start: 0, courses: [] })
  ),
  //---------------------------------------------
  on(
    AppActions.removeCourse,
    (state): AppState => ({ ...state, isLoading: true, start: 0, courses: [] })
  ),
  //----------------------------------------------
  on(
    AppActions.returnToCourses,
    (state): AppState => ({ ...state, isLoading: true, start: 0, courses: [] })
  ),
  //----------------------------------------------
  on(
    AppActions.setSearchTerm,
    (state, { value }): AppState => ({
      ...state,
      searchTerm: value,
      start: 0,
      courses: [],
    })
  )
);

export function AppReducer(state: AppState | undefined, action: Action) {
  return _appReducer(state, action);
}

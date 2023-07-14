import { Course } from './course.interface';
import { User } from './user.interface';

export interface AppState {
  token: string;
  user: User;
  courses: Course[];
  start: number;
  searchTerm: string;
  isLoading: boolean;
}

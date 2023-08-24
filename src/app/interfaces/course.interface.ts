import { CourseAuthor } from './course-author.interface';

export interface Course {
  id: number;
  name: string;
  date: string;
  length: number;
  description: string;
  authors: CourseAuthor[];
  isTopRated: boolean;
}

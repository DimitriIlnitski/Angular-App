import { Course } from 'src/app/interfaces/course.interface';
import { ListSortByCreationDatePipe } from './list-sort-by-creation-date.pipe';

describe('ListSortByCreationDatePipe', () => {
  let pipe: ListSortByCreationDatePipe;

  beforeEach(() => {
    pipe = new ListSortByCreationDatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort course list by creation date in descending order', () => {
    const courseList: Course[] = [
      {
        id: 1,
        name: 'Angular',
        description: 'Description',
        date: '2023-01-10',
        length: 120,
        authors: [],
        isTopRated: false,
      },
      {
        id: 2,
        name: 'React',
        description: 'Description',
        date: '2023-02-10',
        length: 120,
        authors: [],
        isTopRated: false,
      },
      {
        id: 3,
        name: 'JavaScript',
        description: 'Description',
        date: '2023-03-10',
        length: 120,
        authors: [],
        isTopRated: false,
      },
    ];
    const sortedCourseList = pipe.transform(courseList);
    expect(sortedCourseList[0].id).toBe(3);
    expect(sortedCourseList[1].id).toBe(2);
    expect(sortedCourseList[2].id).toBe(1);
  });
});

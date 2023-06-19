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
        id: '1',
        title: 'Course 1',
        description: 'Description 1',
        creationDate: '2023-02-10',
        duration: 120,
        isTopRated: false,
      },
      {
        id: '2',
        title: 'Course 2',
        description: 'Description 2',
        creationDate: '2023-01-10',
        duration: 120,
        isTopRated: false,
      },
      {
        id: '3',
        title: 'Course 3',
        description: 'Description 3',
        creationDate: '2023-03-10',
        duration: 120,
        isTopRated: false,
      },
    ];
    const sortedCourseList = pipe.transform(courseList);
    expect(sortedCourseList[0].id).toBe('3');
    expect(sortedCourseList[1].id).toBe('1');
    expect(sortedCourseList[2].id).toBe('2');
  });
});

import { Course } from 'src/app/interfaces/course.interface';
import { ListFilterCourseNamePipe } from './list-filter-course-name.pipe';

describe('ListFilterCourseNamePipe', () => {
  let pipe: ListFilterCourseNamePipe;

  beforeEach(() => {
    pipe = new ListFilterCourseNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return the filtered course list when searchTerm is not empty', () => {
    const courseList: Course[] = [
      {
        id: '1',
        title: 'Angular',
        description: 'Description',
        creationDate: '2023-01-10',
        duration: 120,
        isTopRated: false,
      },
      {
        id: '2',
        title: 'React',
        description: 'Description',
        creationDate: '2023-02-10',
        duration: 120,
        isTopRated: false,
      },
      {
        id: '3',
        title: 'JavaScript',
        description: 'Description',
        creationDate: '2023-03-10',
        duration: 120,
        isTopRated: false,
      },
    ];
    const filteredCourseList = pipe.transform(courseList, 'angular');
    expect(filteredCourseList.length).toBe(1);
    expect(filteredCourseList[0].id).toBe('1');
  });

  it('should return the original course list when searchTerm is empty', () => {
    const courseList: Course[] = [
      {
        id: '1',
        title: 'Angular',
        description: 'Description',
        creationDate: '2023-01-10',
        duration: 120,
        isTopRated: false,
      },
      {
        id: '2',
        title: 'React',
        description: 'Description',
        creationDate: '2023-02-10',
        duration: 120,
        isTopRated: false,
      },
      {
        id: '3',
        title: 'JavaScript',
        description: 'Description',
        creationDate: '2023-03-10',
        duration: 120,
        isTopRated: false,
      },
    ];
    const filteredCourseList = pipe.transform(courseList, '');
    expect(filteredCourseList).toEqual(courseList);
  });
});

import { TestBed } from '@angular/core/testing';
import { CourseService } from './course.service';

describe('CourseLoaderService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of courses in getList', () => {
    const result = service.getList();
    expect(result).toEqual(service.mockedArray);
  });

  it('should add a course to mockedArray in createCourse', () => {
    const newCourse = {
      id: '1234',
      title: 'New Course',
      description: 'This is a new course.',
      creationDate: '2023-06-24T00:00:00+00:00',
      duration: 120,
      isTopRated: false,
    };

    service.createCourse(newCourse);

    expect(service.mockedArray).toContain(newCourse);
    expect(service.mockedArray.length).toBeGreaterThan(3); // Assuming the initial mockedArray has 3 items
  });

  it('should return the correct course in getItemById', () => {
    const courseId = '8693';
    const expectedCourse = service.mockedArray.find(
      (course) => course.id === courseId
    );

    const result = service.getItemById(courseId);

    expect(result).toEqual(expectedCourse);
  });

  it('should update the course in updateItem', () => {
    const courseId = '8693';
    const updatedFields = { title: 'Updated Title', duration: 200 };

    service.updateItem(courseId, updatedFields);

    const updatedCourse = service.mockedArray.find(
      (course) => course.id === courseId
    );
    expect(updatedCourse?.title).toEqual(updatedFields.title);
    expect(updatedCourse?.duration).toEqual(updatedFields.duration);
  });

  it('should remove the course from mockedArray in removeItem', () => {
    const courseId = '8693';

    service.removeItem(courseId);

    const removedCourse = service.mockedArray.find(
      (course: { id: string }) => course.id === courseId
    );
    expect(removedCourse).toBeUndefined();
    expect(service.mockedArray.length).toBeLessThan(3);
  });
});

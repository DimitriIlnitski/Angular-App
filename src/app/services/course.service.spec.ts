import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CourseService } from './course.service';
import { Course } from '../interfaces/course.interface';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService],
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to courses endpoint without search term', () => {
    const dummyCourses: Course[] = [
      {
        id: 1,
        name: 'Course 1',
        date: '2021-01-01',
        length: 60,
        description: 'Course 1 Description',
        authors: [],
        isTopRated: false,
      },
      {
        id: 2,
        name: 'Course 2',
        date: '2021-02-01',
        length: 90,
        description: 'Course 2 Description',
        authors: [],
        isTopRated: false,
      },
    ];

    service.getList().subscribe((courses) => {
      expect(courses).toEqual(dummyCourses);
    });

    const httpRequest = httpMock.expectOne(
      'http://localhost:3004/courses?start=0&count=3&sort=date'
    );
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush(dummyCourses);
  });

  it('should make a GET request to courses endpoint with search term', () => {
    const searchTerm = 'angular';
    const dummyCourses: Course[] = [
      {
        id: 1,
        name: 'Angular Course',
        date: '2021-01-01',
        length: 60,
        description: 'Angular Course Description',
        authors: [],
        isTopRated: false,
      },
      {
        id: 2,
        name: 'Advanced Angular',
        date: '2021-02-01',
        length: 90,
        description: 'Advanced Angular Course',
        authors: [],
        isTopRated: false,
      },
    ];

    service.searchTerm = searchTerm;
    service.getList().subscribe((courses) => {
      expect(courses).toEqual(dummyCourses);
    });

    const httpRequest = httpMock.expectOne(
      'http://localhost:3004/courses?start=0&count=3&sort=date&textFragment=angular'
    );
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush(dummyCourses);
  });

  it('should make a POST request to create a new course', () => {
    const newCourse: Course = {
      id: 1,
      name: 'New Course',
      date: '2021-01-01',
      length: 60,
      description: 'New Course Description',
      authors: [],
      isTopRated: false,
    };

    service.createCourse(newCourse).subscribe();

    const httpRequest = httpMock.expectOne('http://localhost:3004/courses');
    expect(httpRequest.request.method).toBe('POST');
    expect(httpRequest.request.body).toEqual({ course: newCourse });
    httpRequest.flush({});
  });

  it('should return a course matching the given ID', () => {
    const courseId = '1';
    const courses: Course[] = [
      {
        id: 1,
        name: 'Course 1',
        date: '2021-01-01',
        length: 60,
        description: 'Course 1 Description',
        authors: [],
        isTopRated: false,
      },
      {
        id: 2,
        name: 'Course 2',
        date: '2021-02-01',
        length: 90,
        description: 'Course 2 Description',
        authors: [],
        isTopRated: false,
      },
    ];
    service.courses = courses;

    const course = service.getItemById(courseId);

    expect(course).toEqual(courses[0]);
  });

  it('should return undefined if no course matches the given ID', () => {
    const courseId = '3';
    const courses: Course[] = [
      {
        id: 1,
        name: 'Course 1',
        date: '2021-01-01',
        length: 60,
        description: 'Course 1',
        authors: [],
        isTopRated: false,
      },
      {
        id: 2,
        name: 'Course 2',
        date: '2021-02-01',
        length: 90,
        description: 'Course 2',
        authors: [],
        isTopRated: false,
      },
    ];
    service.courses = courses;

    const course = service.getItemById(courseId);

    expect(course).toBeUndefined();
  });

  it('should make a PATCH request to update a course', () => {
    const courseId = '1';
    const updatedFields = { name: 'Updated Course', length: 120 };

    service.updateItem(courseId, updatedFields).subscribe();

    const httpRequest = httpMock.expectOne(
      `http://localhost:3004/courses/${courseId}`
    );
    expect(httpRequest.request.method).toBe('PATCH');
    expect(httpRequest.request.body).toEqual(updatedFields);
    httpRequest.flush({});
  });

  it('should make a DELETE request to remove a course', () => {
    const courseId = '1';

    service.removeItem(courseId).subscribe();

    const httpRequest = httpMock.expectOne(
      `http://localhost:3004/courses/${courseId}`
    );
    expect(httpRequest.request.method).toBe('DELETE');
    httpRequest.flush({});
  });
});

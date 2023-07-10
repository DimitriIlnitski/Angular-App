import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { HttpClient } from '@angular/common/http';
import { Course } from '../interfaces/course.interface';

describe('CourseService', () => {
  let courseService: CourseService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService],
    });

    courseService = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve the course list', () => {
    const mockCourses: Course[] = [
      {
        id: 1,
        name: 'Course 1',
        date: '2021-09-01',
        length: 120,
        description: 'Course 1 description',
        authors: [{ id: 1, name: 'Author 1' }],
        isTopRated: true,
      },
      {
        id: 2,
        name: 'Course 2',
        date: '2021-09-02',
        length: 90,
        description: 'Course 2 description',
        authors: [{ id: 2, name: 'Author 2' }],
        isTopRated: false,
      },
    ];

    courseService.getList().subscribe((courses) => {
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(
      'http://localhost:3004/courses?start=0&count=3&sort=date'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should create a course', () => {
    const newCourse: Course = {
      id: 3,
      name: 'New Course',
      date: '2021-09-03',
      length: 150,
      description: 'New course description',
      authors: [{ id: 3, name: 'Author 3' }],
      isTopRated: true,
    };

    courseService.createCourse(newCourse).subscribe((createdCourse) => {
      expect(createdCourse).toEqual(newCourse);
    });

    const req = httpMock.expectOne('http://localhost:3004/courses');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(newCourse);
  });

  it('should retrieve a course by ID', () => {
    const mockCourses: Course[] = [
      {
        id: 1,
        name: 'Course 1',
        date: '2021-09-01',
        length: 120,
        description: 'Course 1 description',
        authors: [{ id: 1, name: 'Author 1' }],
        isTopRated: true,
      },
      {
        id: 2,
        name: 'Course 2',
        date: '2021-09-02',
        length: 90,
        description: 'Course 2 description',
        authors: [{ id: 2, name: 'Author 2' }],
        isTopRated: false,
      },
    ];

    courseService.courses = mockCourses;

    const courseId = '1';

    courseService.getItemById(courseId).subscribe((retrievedCourse) => {
      expect(retrievedCourse).toEqual(mockCourses[0]);
    });

    const req = httpMock.expectOne(`http://localhost:3004/courses/${courseId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses[0]);
  });

  it('should update a course', () => {
    const updatedCourse: Course = {
      id: 1,
      name: 'Updated Course',
      date: '2021-09-01',
      length: 120,
      description: 'Updated course description',
      authors: [{ id: 1, name: 'Author 1' }],
      isTopRated: true,
    };

    courseService.updateItem(updatedCourse).subscribe((result) => {
      expect(result).toEqual(updatedCourse);
    });

    const req = httpMock.expectOne(
      `http://localhost:3004/courses/${updatedCourse.id}`
    );
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedCourse);
    req.flush(updatedCourse);
  });

  it('should remove a course', () => {
    const courseId = '1';

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    courseService.removeItem(courseId).subscribe(() => {});

    const req = httpMock.expectOne(`http://localhost:3004/courses/${courseId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});

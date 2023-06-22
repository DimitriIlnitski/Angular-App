import { TestBed } from '@angular/core/testing';

import { CourseLoaderService } from './course-loader-service.service';

describe('CourseLoaderServiceService', () => {
  let service: CourseLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

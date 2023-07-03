import { TestBed } from '@angular/core/testing';

import { RouteParameterService } from './route-parameter.service';

describe('RouteParameterService', () => {
  let service: RouteParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

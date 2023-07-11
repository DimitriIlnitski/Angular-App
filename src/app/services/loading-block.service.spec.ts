import { TestBed } from '@angular/core/testing';
import { LoadingBlockService } from './loading-block.service';

describe('LoadingBlockService', () => {
  let service: LoadingBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingBlockService],
    });
    service = TestBed.inject(LoadingBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have isLoading set to false', () => {
    expect(service.isLoading).toBeFalse();
  });

  it('should return the correct value for isLoadingMethod', () => {
    expect(service.isLoadingMethod()).toBe(service.isLoading);
  });

});

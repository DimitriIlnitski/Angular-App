import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingBlockComponent } from './loading-block.component';
import { LoadingBlockService } from '../services/loading-block.service';
import { By } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

describe('LoadingBlockComponent', () => {
  let component: LoadingBlockComponent;
  let fixture: ComponentFixture<LoadingBlockComponent>;
  let loadingBlockService: LoadingBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule, CommonModule],
      declarations: [LoadingBlockComponent],
      providers: [LoadingBlockService],
    });
    fixture = TestBed.createComponent(LoadingBlockComponent);
    component = fixture.componentInstance;
    loadingBlockService = TestBed.inject(LoadingBlockService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show overlay and spinner when isLoadingMethod returns true', () => {
    spyOn(loadingBlockService, 'isLoadingMethod').and.returnValue(true);
    fixture.detectChanges();

    const overlayElement = fixture.debugElement.query(By.css('.overlay'));
    expect(overlayElement).toBeTruthy();

    const spinnerElement = overlayElement.query(By.css('mat-progress-spinner'));
    expect(spinnerElement).toBeTruthy();
  });

  it('should not show overlay and spinner when isLoadingMethod returns false', () => {
    spyOn(loadingBlockService, 'isLoadingMethod').and.returnValue(false);
    fixture.detectChanges();

    const overlayElement = fixture.debugElement.query(By.css('.overlay'));
    expect(overlayElement).toBeFalsy();

    const spinnerElement = overlayElement?.query(
      By.css('mat-progress-spinner')
    );
    expect(spinnerElement).toBeFalsy();
  });
});

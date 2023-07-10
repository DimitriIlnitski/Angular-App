import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationComponent } from './duration.component';
import { DurationFormatPipe } from '../shared/pipes/duration-format.pipe';
import { FormsModule } from '@angular/forms';

describe('DurationComponent', () => {
  let component: DurationComponent;
  let fixture: ComponentFixture<DurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DurationComponent, DurationFormatPipe],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(DurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit value when onValueChange is called', () => {
    const value = '90';
    const valueChangeSpy = spyOn(component.valueChange, 'emit');

    component.value = value;
    component.onValueChange();

    expect(valueChangeSpy).toHaveBeenCalledWith(value);
  });
});

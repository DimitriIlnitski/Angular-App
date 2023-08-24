import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateComponent } from './date.component';
import { FormsModule } from '@angular/forms';

describe('DateComponent', () => {
  let component: DateComponent;
  let fixture: ComponentFixture<DateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateComponent],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(DateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit value when onValueChange is called', () => {
    const value = '2023-07-08';
    const valueChangeSpy = spyOn(component.valueChange, 'emit');

    component.value = value;
    component.onValueChange();

    expect(valueChangeSpy).toHaveBeenCalledWith(value);
  });
});

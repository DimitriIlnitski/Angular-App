import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseComponent } from './create-course.component';
import { ButtonComponent } from '../shared/button/button.component';
import { InputComponent } from '../shared/input/input.component';
import { DurationFormatPipe } from '../shared/pipes/duration-format.pipe';
import { FormsModule } from '@angular/forms';

describe('CreateCourseComponent', () => {
  let component: CreateCourseComponent;
  let fixture: ComponentFixture<CreateCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateCourseComponent,
        ButtonComponent,
        InputComponent,
        DurationFormatPipe,
      ],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(CreateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the dateValue when dateInputHandler is called', () => {
    const date = '2023-06-28';
    component.dateInputHandler(date);
    expect(component.dateValue).toBe(date);
  });

  it('should update the authorsValue when authorsInputHandler is called', () => {
    const authors = 'John Doe, Jane Smith';
    component.authorsInputHandler(authors);
    expect(component.authorsValue).toBe(authors);
  });

  it('should log "Cancel" when cancel is called', () => {
    spyOn(console, 'log');
    component.cancel();
    expect(console.log).toHaveBeenCalledWith('Cancel');
  });

  it('should log "Save" when save is called', () => {
    spyOn(console, 'log');
    component.save();
    expect(console.log).toHaveBeenCalledWith('Save');
  });
});

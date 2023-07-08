import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseComponent } from './create-course.component';
import { ButtonComponent } from '../shared/button/button.component';
import { InputComponent } from '../shared/input/input.component';
import { DurationFormatPipe } from '../shared/pipes/duration-format.pipe';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DurationComponent } from '../duration/duration.component';
import { DateComponent } from '../date/date.component';
import { AuthorsComponent } from '../authors/authors.component';

describe('CreateCourseComponent', () => {
  let component: CreateCourseComponent;
  let fixture: ComponentFixture<CreateCourseComponent>;

  beforeEach(() => {
    const activatedRouteMock = {
      snapshot: {
        params: { id: '1' },
      },
    };

    TestBed.configureTestingModule({
      declarations: [
        CreateCourseComponent,
        ButtonComponent,
        InputComponent,
        DurationFormatPipe,
        DurationComponent,
        DateComponent,
        AuthorsComponent,
      ],
      imports: [FormsModule, HttpClientModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }],
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
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardComponent } from './course-card.component';
import {
  faClock,
  faCalendar,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { AppModule } from '../app.module';
import { Component } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '../shared/button/button.component';
import { DurationFormatPipe } from '../shared/pipes/duration-format.pipe';
import { CardBorderColorDirective } from '../shared/directives/card-border-color.directive';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `<app-course-card
    [courseItem]="course"
    (cardDeleteClick)="onCardDeleteClick($event)"
  ></app-course-card>`,
})
class TestHostComponent {
  course: Course = {
    id: 1,
    name: 'Test Course',
    description: 'Test Description',
    date: '2021-09-10',
    length: 120,
    authors: [],
    isTopRated: false,
  };

  deletedCourseId: string | undefined;

  onCardDeleteClick(id: string) {
    this.deletedCourseId = id;
  }
}

describe('CourseCardComponent (Test as a class)', () => {
  let component: CourseCardComponent;

  beforeEach(() => {
    const router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    component = new CourseCardComponent(router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial values', () => {
    expect(component.courseItem).toEqual({
      id: 100,
      name: 'title',
      date: '2023-06-19',
      length: 125,
      description: 'description',
      authors: [],
      isTopRated: false,
    });
    expect(component.faClock).toEqual(faClock);
    expect(component.faCalendar).toEqual(faCalendar);
    expect(component.faPen).toEqual(faPen);
    expect(component.faTrash).toEqual(faTrash);
  });

  it('should emit event when Delete button is clicked', () => {
    spyOn(component.cardDeleteClick, 'emit');
    component.deleteClick();
    expect(component.cardDeleteClick.emit).toHaveBeenCalled();
  });
});

describe('CourseCardComponent (Stand alone testing)', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(() => {
    const activatedRouteMock = {
      snapshot: {
        params: { id: '1' },
      },
    };
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, CommonModule],
      declarations: [
        CourseCardComponent,
        ButtonComponent,
        DurationFormatPipe,
        CardBorderColorDirective,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
      ],
    });
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create - stand alone', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial values', () => {
    expect(component.courseItem).toEqual({
      id: 100,
      name: 'title',
      date: '2023-06-19',
      length: 125,
      description: 'description',
      authors: [],
      isTopRated: false,
    });
    expect(component.faClock).toEqual(faClock);
    expect(component.faCalendar).toEqual(faCalendar);
    expect(component.faPen).toEqual(faPen);
    expect(component.faTrash).toEqual(faTrash);
  });

  it('should emit event when Delete button is clicked', () => {
    spyOn(component.cardDeleteClick, 'emit');
    component.deleteClick();
    fixture.detectChanges();
    expect(component.cardDeleteClick.emit).toHaveBeenCalled();
  });

  it('should have course-card__star--not-visible class when courseItem.isTopRated is false', () => {
    component.courseItem = {
      id: 100,
      name: 'title',
      date: '2023-06-19',
      length: 125,
      description: 'description',
      authors: [],
      isTopRated: true,
    };
    fixture.detectChanges();

    const starIcon = fixture.debugElement.query(By.css('.course-card__star'));

    expect(starIcon.classes['course-card__star--not-visible']).toBe(true);
  });
});

describe('CourseCardComponent (Host component testing)', () => {
  let testHostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [CourseCardComponent, TestHostComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit the delete event with course id', () => {
    const courseCardDebugElement = fixture.debugElement.query(
      By.directive(CourseCardComponent)
    );
    const courseCardComponent =
      courseCardDebugElement.componentInstance as CourseCardComponent;

    spyOn(testHostComponent, 'onCardDeleteClick');

    courseCardComponent.deleteClick();

    expect(testHostComponent.onCardDeleteClick).toHaveBeenCalledWith(
      String(testHostComponent.course.id)
    );
  });
});

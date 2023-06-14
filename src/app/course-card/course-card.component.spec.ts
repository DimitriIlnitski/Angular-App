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

@Component({
  template: `<app-course-card
    [courseItem]="course"
    (cardDeleteClick)="onCardDeleteClick($event)"
  ></app-course-card>`,
})
class TestHostComponent {
  course: Course = {
    id: '1',
    title: 'Test Course',
    description: 'Test Description',
    creationDate: '2021-09-10',
    duration: 120,
  };

  deletedCourseId: string | undefined;

  onCardDeleteClick(id: string) {
    this.deletedCourseId = id;
  }
}

describe('CourseCardComponent (Test as a class)', () => {
  let component: CourseCardComponent;

  beforeEach(() => {
    component = new CourseCardComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial values', () => {
    expect(component.courseItem).toEqual({
      id: 'Empty',
      title: 'Empty',
      description: 'Empty',
      creationDate: 'Empty',
      duration: 0,
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
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CourseCardComponent, ButtonComponent],
    });
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial values', () => {
    expect(component.courseItem).toEqual({
      id: 'Empty',
      title: 'Empty',
      description: 'Empty',
      creationDate: 'Empty',
      duration: 0,
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
      testHostComponent.course.id
    );
  });
});

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
import { CardBorderColorDirective } from '../directives/card-border-color.directive';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

xdescribe('CourseCardComponent (Test as a class)', () => {
  let component: CourseCardComponent;

  beforeEach(() => {
    component = new CourseCardComponent(new Router());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial values', () => {
    expect(component.courseItem).toEqual({
      id: 1,
      name: 'Test Course',
      description: 'Test Description',
      date: '2021-09-10',
      length: 120,
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

xdescribe('CourseCardComponent (Stand alone testing)', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, CommonModule],
      declarations: [
        CourseCardComponent,
        ButtonComponent,
        DurationFormatPipe,
        CardBorderColorDirective,
      ],
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
      id: 1,
      name: 'Test Course',
      description: 'Test Description',
      date: '2021-09-10',
      length: 120,
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
      id: 1,
      name: 'Test Course',
      description: 'Test Description',
      date: '2021-09-10',
      length: 120,
      authors: [],
      isTopRated: false,
    };
    fixture.detectChanges();

    const starIcon = fixture.debugElement.query(By.css('.course-card__star'));

    expect(starIcon.classes['course-card__star--not-visible']).toBe(true);
  });

  it('should not have course-card__star--not-visible class when courseItem.isTopRated is true', () => {
    component.courseItem = {
      id: 1,
      name: 'Test Course',
      description: 'Test Description',
      date: '2021-09-10',
      length: 120,
      authors: [],
      isTopRated: false,
    };
    fixture.detectChanges();

    const starIcon = fixture.debugElement.query(By.css('.course-card__star'));

    expect(starIcon.classes['course-card__star--not-visible']).toBeUndefined();
  });
});

xdescribe('CourseCardComponent (Host component testing)', () => {
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

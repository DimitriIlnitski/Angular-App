import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { AppModule } from '../app.module';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../interfaces/course.interface';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [CoursesComponent],
    });
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial values', () => {
    expect(component.courseList).toEqual([]);
    expect(component.faPlus).toEqual(faPlus);
  });

  it('should return correct id when trackByCourseId is called', () => {
    const fakeCourse: Course = {
      id: 'A',
      title: 'Empty',
      description: 'Empty',
      creationDate: 'Empty',
      duration: 0,
    };

    expect(component.trackByCourseId(1, fakeCourse)).toEqual('A');
  });

  it('should log when handleClickLoadMore is called', () => {
    const btn = el.query(By.css('.load-more__button')).nativeElement;    
    spyOn(console, 'log');
    btn.click();
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith('Load more');
  });

  it('should log id when showDeleteId is called', () => {
    const fakeId = 'Fake';
    spyOn(console, 'log');
    component.showDeleteId(fakeId);
    expect(console.log).toHaveBeenCalledWith(fakeId);
  });

  it('should show list of courses', () => {
    component.courseList = [
      {
        id: '8693',
        title: 'duis mollit reprehenderit ad',
        description:
          'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
        creationDate: '2017-09-28T04:39:24+00:00',
        duration: 157,
      },
      {
        id: '4980',
        title: 'magna excepteur aute deserunt',
        description:
          'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
        creationDate: '2016-05-31T02:02:36+00:00',
        duration: 207,
      },
    ];
    fixture.detectChanges();
    const courseCards = el.queryAll(By.css('.course-card'));
    expect(courseCards.length).toBe(2);
  });
});

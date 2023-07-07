import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { AppModule } from '../app.module';
import { Course } from '../interfaces/course.interface';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

xdescribe('CoursesComponent', () => {
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
    component.courseService.courses = [
      {
        id: 1,
        name: 'Empty',
        description: 'Empty',
        date: 'Empty',
        length: 0,
        authors: [],
        isTopRated: false,
      },
      {
        id: 1,
        name: 'Empty',
        description: 'Empty',
        date: 'Empty',
        length: 0,
        authors: [],
        isTopRated: false,
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct id when trackByCourseId is called', () => {
    const fakeCourse: Course = {
      id: 1,
      name: 'Empty',
      description: 'Empty',
      date: 'Empty',
      length: 0,
      authors: [],
      isTopRated: false,
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


  it('should show list of courses', () => {
    fixture.detectChanges();
    const courseCards = el.queryAll(By.css('.course-card'));
    expect(courseCards.length).toBe(2);
  });

  it('should show "Load more" button if courseList is not empty', () => {
    component.courseService.courses = [
      {
        id: 1,
        name: 'Test Course',
        description: 'This is a test course.',
        date: '2023-01-01',
        length: 60,
        authors: [],
        isTopRated: false,
      },
    ];
    fixture.detectChanges();
    const loadMoreButton =
      fixture.nativeElement.querySelector('.load-more__button');
    expect(loadMoreButton).toBeTruthy();
  });

  it('should show "No data" message if courseList is empty', () => {
    component.courseService.courses = [];
    fixture.detectChanges();
    const noCoursesDiv =
      fixture.nativeElement.querySelector('.course-nocourses');
    expect(noCoursesDiv).toBeTruthy();
  });
});

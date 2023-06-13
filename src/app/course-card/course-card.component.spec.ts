import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardComponent } from './course-card.component';
import {
  faClock,
  faCalendar,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { AppModule } from '../app.module';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [CourseCardComponent],
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

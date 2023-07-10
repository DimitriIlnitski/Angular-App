import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';
import { Course } from '../interfaces/course.interface';
import { IfAuthenticatedDirective } from '../shared/directives/if-authenticated.directive';
import { of } from 'rxjs';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let courseService: jasmine.SpyObj<CourseService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const courseSpy = jasmine.createSpyObj('CourseService', [
      'getItemById',
      'isLoadingMethod',
    ]); // Add 'isLoadingMethod' to the CourseService spy

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BreadcrumbsComponent, IfAuthenticatedDirective],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: CourseService, useValue: courseSpy },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    courseService = TestBed.inject(
      CourseService
    ) as jasmine.SpyObj<CourseService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    authService.isAuthenticated.and.returnValue(true);
    const course: Course = {
      id: 1,
      name: 'Course 1',
      date: '2021-09-01',
      length: 120,
      description: 'Course 1 description',
      authors: [],
      isTopRated: true,
    };
    courseService.getItemById.and.returnValue(of(course));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should be visible when authenticated', () => {
    expect(component.isBreadcrumbsVisible()).toBe(true);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', [
      'isAuthenticated',
    ]);

    await TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return true when authService.isAuthenticated returns true', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    const result = component.isBreadcrumbsVisible();

    expect(result).toBeTrue();
    expect(authServiceSpy.isAuthenticated).toHaveBeenCalled();
  });

  it('should return false when authService.isAuthenticated returns false', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const result = component.isBreadcrumbsVisible();

    expect(result).toBeFalse();
    expect(authServiceSpy.isAuthenticated).toHaveBeenCalled();
  });
});

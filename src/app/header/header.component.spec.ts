import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize font awesome icons', () => {
    expect(component.faUser).toBeTruthy();
    expect(component.faRightFromBracket).toBeTruthy();
  });

  it('should call logout and navigate to login page', () => {
    const logoutSpy = spyOn(authService, 'logout').and.callThrough();
    const navigateSpy = spyOn(router, 'navigate').and.callThrough();

    component.logoutHandle();

    expect(logoutSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should return true if user is authenticated', () => {
    const isAuthenticated = component.isUserAndBtnVisible();
    expect(isAuthenticated).toBe(true);
  });
});

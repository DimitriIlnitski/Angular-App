import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jasmine.createSpy().and.returnValue(of({})),
            getToken: () => 'token',
          },
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update login data when email input changes', () => {
    const login = 'testuser@example.com';
    component.emailInputHandle(login);
    expect(component.loginData.login).toBe(login);
  });

  it('should update login data when password input changes', () => {
    const password = 'testpassword';
    component.passwordInputHandle(password);
    expect(component.loginData.password).toBe(password);
  });

  it('should call login on AuthService and navigate to courses page', () => {
    component.login();
    expect(authService.login).toHaveBeenCalledWith(component.loginData);
    expect(router.navigate).toHaveBeenCalledWith(['courses']);
  });
});

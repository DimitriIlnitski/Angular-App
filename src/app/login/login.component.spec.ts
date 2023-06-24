import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { ButtonComponent } from '../shared/button/button.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent, ButtonComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set email in loginData when emailInputHandle is called', () => {
    const email = 'test@example.com';

    component.emailInputHandle(email);

    expect(component.loginData.email).toEqual(email);
  });

  it('should set password in loginData when passwordInputHandle is called', () => {
    const password = 'password123';

    component.passwordInputHandle(password);

    expect(component.loginData.password).toEqual(password);
  });

});

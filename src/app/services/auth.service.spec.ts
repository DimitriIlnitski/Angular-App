import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user item in localStorage and assign token on login', () => {
    const loginData = { email: 'test@example.com', password: 'password' };
    const fakeUser = {
      id: 1,
      name: 'name',
      lastName: 'lastName',
      token: 'token',
    };

    service.login(loginData);

    const storedUser = localStorage.getItem('user');
    expect(storedUser).toBeTruthy();

    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      expect(parsedUser).toEqual(fakeUser);

      expect(service['token']).toEqual(fakeUser.token);
    } else {
      fail('storedUser should not be null');
    }
  });

  it('should remove user item from localStorage and reset token on logout', () => {
    localStorage.setItem('user', JSON.stringify({ token: 'fake-token' }));

    service.logout();

    expect(localStorage.getItem('user')).toBeFalsy();
    expect(service['token']).toEqual('');
  });

  it('should return true when token is not empty in isAuthenticated', () => {
    service['token'] = 'fake-token';

    const result = service.isAuthenticated();

    expect(result).toBeTrue();
  });

  it('should return false when token is empty in isAuthenticated', () => {
    service['token'] = '';

    const result = service.isAuthenticated();

    expect(result).toBeFalse();
  });

  it('should return user object from localStorage in getUserInfo', () => {
    const fakeUser = {
      id: 1,
      name: 'name',
      lastName: 'lastName',
      token: 'token',
    };
    localStorage.setItem('user', JSON.stringify(fakeUser));

    const result = service.getUserInfo();

    expect(result).toEqual(fakeUser);
  });

  it('should return undefined from getUserInfo when user does not exist in localStorage', () => {
    const result = service.getUserInfo();

    expect(result).toBeUndefined();
  });
});

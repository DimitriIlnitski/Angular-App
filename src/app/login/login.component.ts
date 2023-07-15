import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../store/app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = { login: '', password: '' };

  constructor(
    public store: Store
  ) {}

  emailInputHandle(login: string) {
    this.loginData.login = login;
  }
  passwordInputHandle(password: string) {
    this.loginData.password = password;
  }

  login() {
    this.store.dispatch(login(this.loginData));
  }
}

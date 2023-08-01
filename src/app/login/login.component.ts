import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginTo } from '../store/app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginValue = '';
  passwordValue = '';

  constructor(public store: Store) {}

  login() {
    this.store.dispatch(
      loginTo({
        login: this.loginValue,
        password: this.passwordValue,
      })
    );
    this.loginValue = '';
    this.passwordValue = '';
  }
}

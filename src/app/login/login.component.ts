import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginTo } from '../store/app.actions';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  myControlFocus = false;
  loginForm!: FormGroup;

  constructor(public store: Store, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      loginGroup: this.fb.group({
        login: ['', [Validators.required]],
      }),
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
      }),
    });
  }

  login() {
    if (this.loginForm.valid) {
      const loginData = {
        login: this.loginForm.value.loginGroup.login,
        password: this.loginForm.value.passwordGroup.password,
      };
      this.store.dispatch(loginTo(loginData));
    }
  }
}

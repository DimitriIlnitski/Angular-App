import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginTo } from '../store/app.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(public store: Store) {
    this.loginForm = new FormGroup({
      loginGroup: new FormGroup({
        login: new FormControl('', [Validators.required]),
      }),
      passwordGroup: new FormGroup({
        password: new FormControl('', [Validators.required]),
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
      console.log(this.loginForm.value);
    }
  }
}

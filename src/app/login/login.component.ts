import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginTo } from '../store/app.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myControlFocus = false;
  loginForm!: FormGroup;

  constructor(
    public store: Store,
    private fb: FormBuilder,
    public translate: TranslateService
  ) {
    this.loginForm = this.fb.group({
      loginGroup: this.fb.group({
        login: ['', [Validators.required]],
      }),
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
      }),
    });
  }

  ngOnInit() {
    this.translate.store.onLangChange.subscribe((lang: LangChangeEvent) => {
      this.translate.use(lang.lang);
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

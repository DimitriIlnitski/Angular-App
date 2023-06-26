import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService) {}

  emailInputHandle(email: string) {
    this.loginData.email = email;
  }
  passwordInputHandle(password: string) {
    this.loginData.password = password;
  }

  login() {
    this.authService.login(this.loginData);
    console.log('Logged in successfully');
  }
}

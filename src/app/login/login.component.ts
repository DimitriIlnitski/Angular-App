import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  loginData = { email: '', password: '' };
  emailInputHandle(email: string) {
    return (this.loginData.email = email);
  }
  passwordInputHandle(password: string) {
    return (this.loginData.password = password);
  }

  login() {
    console.log('csscscscscscscscscsssssssssssssssssssssssssssssssssssss');
    this.authService.login(this.loginData);
    console.log('Logged in successfully');
  }
}

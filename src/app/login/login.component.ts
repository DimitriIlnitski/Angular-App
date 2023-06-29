import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  emailInputHandle(email: string) {
    this.loginData.email = email;
  }
  passwordInputHandle(password: string) {
    this.loginData.password = password;
  }

  login() {
    this.authService.login(this.loginData);
    this.router.navigate(['/courses']);
    console.log('Logged in successfully');
  }
}

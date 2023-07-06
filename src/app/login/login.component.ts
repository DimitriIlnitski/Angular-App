import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = { login: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  emailInputHandle(login: string) {
    this.loginData.login = login;
  }
  passwordInputHandle(password: string) {
    this.loginData.password = password;
  }

  login() {
    this.authService.login(this.loginData).subscribe({
      next: () => {
        this.router.navigate(['courses']);
        console.log('Logged in successfully');
      },
    });
  }
}

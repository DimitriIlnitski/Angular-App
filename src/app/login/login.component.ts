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

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    alert('Login-------------Initiate');
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnDestroy() {
    alert('Login------Destroy');
  }

  emailInputHandle(login: string) {
    this.loginData.login = login;
  }
  passwordInputHandle(password: string) {
    this.loginData.password = password;
  }

  login() {
    this.authService.login(this.loginData).subscribe({
      next: () => {
        alert('Navigateeeeeeeeeeeeeeeeee---------------start');
        this.router.navigate(['courses']);
        console.log('Logged in successfully');
        alert('Navigateeeeeeeeeeeeeeeeee---------------end');
      },
    });
  }
}

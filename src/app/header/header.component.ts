import { Component, OnInit } from '@angular/core';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userDetails ='';
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userData();
  }

  userData() {
    this.authService.getUserInfo().subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userDetails = `${user.name.first}`;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  logoutHandle() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isUserAndBtnVisible(): boolean {
    return this.authService.isAuthenticated();
  }
}

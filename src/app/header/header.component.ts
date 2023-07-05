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
  constructor(private authService: AuthService, private router: Router) {}
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;

  ngOnInit() {
    console.log(this.userData());
  }

  userData() {
    this.authService.getUserInfo();
  }

  logoutHandle() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  isUserAndBtnVisible(): boolean {
    return this.authService.isAuthenticated();
  }
}

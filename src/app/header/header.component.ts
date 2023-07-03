import { Component } from '@angular/core';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;

  logoutHandle() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isUserAndBtnVisible(): boolean{
    return this.authService.isAuthenticated();
  }
}

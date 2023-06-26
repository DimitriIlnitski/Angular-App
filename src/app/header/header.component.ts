import { Component } from '@angular/core';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;

  logoutHandle() {
    this.authService.logout();
  }

  userAndBtnIsVisible(){
    return this.authService.isAuthenticated();
  }
}

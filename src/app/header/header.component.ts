import { Component } from '@angular/core';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { logout } from '../store/app.actions';
import { selectToken, selectUserDetails } from '../store/app.selector';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;  

  constructor(private store: Store) {
  }

  logoutHandle() {
    this.store.dispatch(logout());
  }

  isUserAndBtnVisible(): Observable<string> {
    return this.store.select(selectToken);
  }

  getUserName(): Observable<string> {
    return this.store.select(selectUserDetails) || of('Uknown');
  }
}

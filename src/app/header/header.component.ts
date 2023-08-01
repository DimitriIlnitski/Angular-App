import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;

  userName$!: Observable<string>;
  isLoadingValue$!: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.userName$ = this.store.select(selectUserDetails) || of('Uknown');
    this.isLoadingValue$ = this.store.select(selectToken);
  }

  logoutHandle() {
    this.store.dispatch(logout());
  }
}

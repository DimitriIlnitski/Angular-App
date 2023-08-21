import { Component, OnInit } from '@angular/core';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { logout } from '../store/app.actions';
import { selectToken, selectUserDetails } from '../store/app.selector';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;

  selectedLanguage = '';
  supportedLanguages: string[] = [];
  userName$!: Observable<string>;
  isLoadingValue$!: Observable<string>;

  constructor(private store: Store, public translate: TranslateService) {}

  ngOnInit() {
    this.supportedLanguages = environment.supportedLanguages;
    this.userName$ = this.store.select(selectUserDetails) || of('Uknown');
    this.isLoadingValue$ = this.store.select(selectToken);
  }

  logoutHandle() {
    this.store.dispatch(logout());
  }

  onLanguageChange() {
    this.translate.use(this.selectedLanguage.toLowerCase());
  }
}

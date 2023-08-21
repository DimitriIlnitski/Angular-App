import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoading } from './store/app.selector';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoadingValue$!: Observable<boolean>;

  constructor(private store: Store, public translate: TranslateService) {
    translate.addLangs(environment.supportedLanguages);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.translate.store.onLangChange.subscribe((lang: LangChangeEvent) => {
      this.translate.use(lang.lang);
    });
    this.isLoadingValue$ = this.store.select(selectIsLoading);
  }
}

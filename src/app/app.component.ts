import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectIsLoading } from './store/app.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoadingValue$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.isLoadingValue$ = this.store.select(selectIsLoading);
  }
}

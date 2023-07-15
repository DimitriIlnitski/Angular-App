import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectIsLoading } from './store/app.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoadingValue = false;
  isLoadingValue$!: Observable<boolean>;
  subscription!: Subscription;
  constructor(private store: Store) {}

  ngOnInit() {
    this.isLoadingValue$ = this.store.select(selectIsLoading);
    this.subscription = this.isLoadingValue$.subscribe(
      (value) => (this.isLoadingValue = value)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isLoading() {
    return this.isLoadingValue;
  }
}

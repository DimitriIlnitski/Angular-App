import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Course } from '../interfaces/course.interface';
import { Observable, Subscription, filter, map, of, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoading, selectItemById, selectToken } from '../store/app.selector';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadcrumbsValue$!: Observable<string>;

  isLoadingValue = false;
  isLoadingValue$!: Observable<boolean>;
  subscriptionIsLoading!: Subscription;

  isAuthenticated = false;
  isAuthenticated$!: Observable<string>;
  subscriptionIsAuthenticated!: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.breadcrumbsValue$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        const id =
          this.activatedRoute.firstChild?.firstChild?.snapshot.params['id'];
        return id;
      }),
      switchMap((id) => {
        if (id) {
          return this.store.select(selectItemById(id)).pipe(
            // eslint-disable-next-line @ngrx/avoid-mapping-selectors
            map((course: Course | undefined) =>
              course?.name ? ` / ${course.name}` : ''
            )
          );
        } else {
          return of('');
        }
      })
    );
    this.isLoadingValue$ = this.store.select(selectIsLoading);
    this.subscriptionIsLoading = this.isLoadingValue$.subscribe(
      (value) => (this.isLoadingValue = value)
    );

    this.isAuthenticated$ = this.store.select(selectToken);
    this.subscriptionIsAuthenticated = this.isAuthenticated$.subscribe(
      (value) => (this.isAuthenticated = !!value)
    );
  }

  ngOnDestroy() {
    this.subscriptionIsLoading.unsubscribe();
    this.subscriptionIsAuthenticated.unsubscribe();
  }

  isLoading() {
    return this.isLoadingValue;
  }

  isBreadcrumbsVisible(): boolean {
    return this.isAuthenticated;
  }
}

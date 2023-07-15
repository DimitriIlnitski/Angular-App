import { CanActivate, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from '../store/app.selector';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(selectToken).pipe(
      map((token) => {
        if (!token) {
          return this.router.createUrlTree(['login']);
        }
        return true;
      })
    );
  }
}

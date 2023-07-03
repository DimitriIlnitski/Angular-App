import { CanActivateFn, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['login']);
    }
    return true;
  }
}

export const authGuard: CanActivateFn = () => {
  const authService = new AuthService();
  const router = new Router();
  const guard = new AuthGuard(authService, router);
  return guard.canActivate();
};

import { CanActivate, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      alert('Noooooooooooooooooooooooooooo');
      return this.router.createUrlTree(['login']);
    }
    alert('Yesssssssssssssssssssssssssssss');
    return true;
  }
}

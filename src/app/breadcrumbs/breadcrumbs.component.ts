import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent {
  constructor(private authService: AuthService) {}

  breadcrumbsIsVisible(){
    return this.authService.isAuthenticated();
  }
}

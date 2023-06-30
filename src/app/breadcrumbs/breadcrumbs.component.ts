import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbsValue = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  isBreadcrumbsVisible(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    console.log(this.breadcrumbsValue);
  }
}

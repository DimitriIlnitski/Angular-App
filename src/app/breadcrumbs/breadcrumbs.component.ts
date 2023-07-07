import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbsValue: string | undefined = '';

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private router: Router
  ) {}

  isBreadcrumbsVisible(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      const id = this.router.routerState.snapshot.root.firstChild?.params['id'];
      if (!id) {
        this.breadcrumbsValue = '';
      }
      const name = this.courseService.getItemById(id)?.name;
      name ? (this.breadcrumbsValue = `/ ${name}`) : '';
    });
  }
}

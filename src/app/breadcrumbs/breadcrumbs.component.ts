import { Component, AfterContentChecked } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { RouteParameterService } from '../services/route-parameter.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements AfterContentChecked {
  breadcrumbsValue: string | null | undefined = null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private routeParameterService: RouteParameterService
  ) {}

  isBreadcrumbsVisible(): boolean {
    return this.authService.isAuthenticated();
  }

  ngAfterContentChecked(): void {
    const id = this.routeParameterService.getData();
    if (id) {
      this.courseService.getItemById(id).subscribe({
        next: (course) => {
          if (course) {
            this.breadcrumbsValue = `/ ${course.name}`;
          }
        },
      });
      return;
    }
      
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';
import { Course } from '../interfaces/course.interface';
import { Observable, filter, of } from 'rxjs';
import { LoadingBlockService } from '../services/loading-block.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbsValue$!: Observable<string>;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    public loadingBlockService: LoadingBlockService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  isBreadcrumbsVisible(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const id =
          this.activatedRoute.firstChild?.firstChild?.snapshot.params['id'];
        if (id) {
          this.courseService.getItemById(id).subscribe((course: Course) => {
            const updatedValue = course.name ? `/ ${course.name}` : '';
            this.breadcrumbsValue$ = of(updatedValue);
          });
        } else {
          this.breadcrumbsValue$ = of('');
        }
      });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';
import { Course } from '../interfaces/course.interface';
import { Observable, Subscription, of } from 'rxjs';
import { LoadingBlockService } from '../services/loading-block.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadcrumbsValue: Observable<string> = of('');
  routerSubscription: Subscription | undefined;

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
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const id =
          this.activatedRoute.firstChild?.firstChild?.snapshot.params['id'];
        if (id) {
          this.courseService.getItemById(id).subscribe((course: Course) => {
            this.breadcrumbsValue = of(course.name ? `/ ${course.name}` : '');
          });
        } else {
          this.breadcrumbsValue = of('');
        }
      }
    });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }
}

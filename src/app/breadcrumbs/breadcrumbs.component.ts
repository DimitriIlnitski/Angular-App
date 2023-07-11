import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';
import { Course } from '../interfaces/course.interface';
import { Observable, filter, map, of, switchMap } from 'rxjs';
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
    this.breadcrumbsValue$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        const id =
          this.activatedRoute.firstChild?.firstChild?.snapshot.params['id'];
        console.log(id);
        return id;
      }),
      switchMap((id) => {
        if (id) {
          return this.courseService
            .getItemById(id)
            .pipe(
              map((course: Course) => (course.name ? ` / ${course.name}` : ''))
            );
        } else {
          return of('');
        }
      })
    );
  }
}

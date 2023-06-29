import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
  ) {}

  isBreadcrumbsVisible(): boolean {
    return this.authService.isAuthenticated();
  }

  ngOnInit(): void {
  const id = this.activatedRoute.snapshot.params['id'];
    alert(id);
    if (id != undefined) {
      const course = this.courseService.getItemById(id.slice(1));
      if (course != undefined) {
        this.breadcrumbsValue=course.title;
      }
    }
  }
}

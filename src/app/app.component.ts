import { Component, OnInit } from '@angular/core';
import { Course } from './interfaces/course.interface';
import { CourseService } from './services/course.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  mockedArray: Course[] = [];

  constructor(
    private courseService: CourseService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.mockedArray = this.courseService.getList();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from '../course-card/course-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CreateCourseComponent } from '../create-course/create-course.component';
import { DateComponent } from '../date/date.component';
import { DurationComponent } from '../duration/duration.component';
import { AuthorsComponent } from '../authors/authors.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseCardComponent,
    SearchBarComponent,
    CreateCourseComponent,
    DateComponent,
    DurationComponent,
    AuthorsComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    SharedModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
})
export class CoursesModule {}

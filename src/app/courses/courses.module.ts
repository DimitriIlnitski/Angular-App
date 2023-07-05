import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CourseCardComponent } from '../course-card/course-card.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListFilterCourseNamePipe } from '../shared/pipes/list-filter-course-name.pipe';
import { CoursesRoutingModule } from './courses-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CoursesComponent, SearchBarComponent, CourseCardComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    CoursesRoutingModule,
    HttpClientModule,
  ],
  providers: [ListFilterCourseNamePipe],
})
export class CoursesModule {}

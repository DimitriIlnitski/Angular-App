import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CourseCardComponent } from '../course-card/course-card.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectivesModule } from '../directives/directives.module';
import { ListFilterCourseNamePipe } from '../shared/pipes/list-filter-course-name.pipe';

@NgModule({
  declarations: [
    CoursesComponent,
    SearchBarComponent,
    CourseCardComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild([{ path: '', component: CoursesComponent }]),
    SharedModule,
    DirectivesModule,
  ],
  providers: [ListFilterCourseNamePipe],
})
export class CoursesModule {}

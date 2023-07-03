import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateCourseComponent } from './create-course.component';
import { DurationComponent } from '../duration/duration.component';
import { DateComponent } from '../date/date.component';
import { AuthorsComponent } from '../authors/authors.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateCourseRoutingModule } from './create-course-routing.module';

@NgModule({
  declarations: [
    CreateCourseComponent,
    DurationComponent,
    DateComponent,
    AuthorsComponent,
  ],
  imports: [
    CommonModule,
    CreateCourseRoutingModule,
    FormsModule,
    SharedModule,
    CreateCourseRoutingModule,
  ],
})
export class CreateCourseModule {}

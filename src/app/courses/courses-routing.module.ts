import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCourseComponent } from '../create-course/create-course.component';
import { AuthGuard } from '../guards/auth.guard';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  { path: '', component: CoursesComponent, canActivate: [AuthGuard] },
  {
    path: ':id',
    component: CreateCourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new',
    component: CreateCourseComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}

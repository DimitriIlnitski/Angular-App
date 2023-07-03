import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  {
    path: ':id',
    loadChildren: () =>
      import('../create-course/create-course.module').then(
        (m) => m.CreateCourseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'new',
    loadChildren: () =>
      import('../create-course/create-course.module').then(
        (m) => m.CreateCourseModule
      ),
    canActivate: [AuthGuard],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}

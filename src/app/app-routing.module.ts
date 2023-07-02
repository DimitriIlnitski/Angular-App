import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CustomRouteReuseStrategy } from './services/custom-route-reuse.strategy';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/:id',
    loadChildren: () =>
      import('./create-course/create-course.module').then(
        (m) => m.CreateCourseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'courses/new',
    loadChildren: () =>
      import('./create-course/create-course.module').then(
        (m) => m.CreateCourseModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

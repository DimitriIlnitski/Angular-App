import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { InputComponent } from './shared/input/input.component';
import { ButtonComponent } from './shared/button/button.component';
import { LogoComponent } from './shared/logo/logo.component';
import { FooterComponent } from './footer/footer.component';
import { CoursesComponent } from './courses/courses.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardBorderColorDirective } from './directives/card-border-color.directive';
import { DurationFormatPipe } from './shared/pipes/duration-format.pipe';
import { ListSortByCreationDatePipe } from './shared/pipes/list-sort-by-creation-date.pipe';
import { ListFilterCourseNamePipe } from './shared/pipes/list-filter-course-name.pipe';
import { LoginComponent } from './login/login.component';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { CreateCourseComponent } from './create-course/create-course.component';
import { DateComponent } from './date/date.component';
import { DurationComponent } from './duration/duration.component';
import { AuthorsComponent } from './authors/authors.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    InputComponent,
    ButtonComponent,
    FooterComponent,
    CoursesComponent,
    LogoComponent,
    SearchBarComponent,
    CourseCardComponent,
    CardBorderColorDirective,
    DurationFormatPipe,
    ListSortByCreationDatePipe,
    LoginComponent,
    IfAuthenticatedDirective,
    CreateCourseComponent,
    DateComponent,
    DurationComponent,
    AuthorsComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, FormsModule, FontAwesomeModule, AppRoutingModule],
  providers: [ListFilterCourseNamePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}

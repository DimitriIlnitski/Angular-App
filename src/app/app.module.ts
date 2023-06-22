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
  ],
  imports: [BrowserModule, FormsModule, FontAwesomeModule],
  providers: [ListFilterCourseNamePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}


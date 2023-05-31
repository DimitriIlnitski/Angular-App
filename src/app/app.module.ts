import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './header/logo/logo.component';
import { LoginComponent } from './header/login/login.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { InputComponent } from './shared/input/input.component';
import { ButtonComponent } from './shared/button/button.component';
import { FooterComponent } from './footer/footer.component';
import { CoursesComponent } from './courses/courses.component';
import { SectionComponent } from './section/section.component';
import { SearchBarComponent } from './section/search-bar/search-bar.component';
import { CourseCardComponent } from './courses/course-card/course-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    LoginComponent,
    BreadcrumbsComponent,
    InputComponent,
    ButtonComponent,
    FooterComponent,
    CoursesComponent,
    SectionComponent,
    SearchBarComponent,
    CourseCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

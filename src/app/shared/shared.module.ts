import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { LogoComponent } from './logo/logo.component';
import { DurationFormatPipe } from './pipes/duration-format.pipe';
import { ListFilterCourseNamePipe } from './pipes/list-filter-course-name.pipe';
import { ListSortByCreationDatePipe } from './pipes/list-sort-by-creation-date.pipe';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardBorderColorDirective } from '../directives/card-border-color.directive';
import { IfAuthenticatedDirective } from '../directives/if-authenticated.directive';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    LogoComponent,
    DurationFormatPipe,
    ListFilterCourseNamePipe,
    ListSortByCreationDatePipe,
  ],
  imports: [CommonModule, FormsModule, FontAwesomeModule, DirectivesModule],
  exports: [
    ButtonComponent,
    InputComponent,
    LogoComponent,
    DurationFormatPipe,
    ListFilterCourseNamePipe,
    ListSortByCreationDatePipe,
  ],
})
export class SharedModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LogoComponent } from './logo/logo.component';
import { DurationFormatPipe } from './pipes/duration-format.pipe';
import { ListFilterCourseNamePipe } from './pipes/list-filter-course-name.pipe';
import { ListSortByCreationDatePipe } from './pipes/list-sort-by-creation-date.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardBorderColorDirective } from './directives/card-border-color.directive';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    ButtonComponent,
    LogoComponent,
    DurationFormatPipe,
    ListFilterCourseNamePipe,
    ListSortByCreationDatePipe,
    CardBorderColorDirective,
    IfAuthenticatedDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TranslateModule.forChild(),
  ],
  exports: [
    ButtonComponent,
    LogoComponent,
    DurationFormatPipe,
    ListFilterCourseNamePipe,
    ListSortByCreationDatePipe,
    CardBorderColorDirective,
    IfAuthenticatedDirective,
    TranslateModule,
  ],
})
export class SharedModule {}

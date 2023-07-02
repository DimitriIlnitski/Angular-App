import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { CardBorderColorDirective } from '../directives/card-border-color.directive';
import { IfAuthenticatedDirective } from '../directives/if-authenticated.directive';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PageNotFoundComponent }]),
    SharedModule,
    DirectivesModule,
  ],
})
export class PageNotFoundModule {}

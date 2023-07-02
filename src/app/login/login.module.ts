import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

import { SharedModule } from '../shared/shared.module';
import { CardBorderColorDirective } from '../directives/card-border-color.directive';
import { IfAuthenticatedDirective } from '../directives/if-authenticated.directive';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    SharedModule,
    DirectivesModule,
  ],
})
export class LoginModule {}

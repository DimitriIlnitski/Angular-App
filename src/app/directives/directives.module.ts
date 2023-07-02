import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardBorderColorDirective } from './card-border-color.directive';
import { IfAuthenticatedDirective } from './if-authenticated.directive';



@NgModule({
  declarations: [IfAuthenticatedDirective, CardBorderColorDirective],
  imports: [CommonModule],
  exports: [IfAuthenticatedDirective, CardBorderColorDirective],
})
export class DirectivesModule {}

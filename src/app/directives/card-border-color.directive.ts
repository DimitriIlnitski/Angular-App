import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { AppConstants } from '../shared/constants/constants';

@Directive({
  selector: '[appCardBorderColor]',
})
export class CardBorderColorDirective implements OnInit {
  @Input('appCardBorderColor')
  courseDate = '';

  @HostBinding('class')
  elementClass = '';

  ngOnInit() {
    const currentDate = new Date();
    const creationDate = new Date(this.courseDate);
    if (
      creationDate < currentDate &&
      creationDate.getTime() >= currentDate.getTime() - AppConstants.TWO_WEEKS
    ) {
      return (this.elementClass = this.elementClass + ' ' + 'green-border');
    } else if (creationDate > currentDate) {
      return (this.elementClass = this.elementClass + ' ' + 'blue-border');
    } 
      return;
  }
}

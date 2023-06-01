import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input()
  buttonTypes?: 'header__button';
  @Input()
  buttonText = 'Default Text';
  @Output()
  buttonClick=new EventEmitter<void>();

  clickHandler(){
    this.buttonClick.emit();
  }
}

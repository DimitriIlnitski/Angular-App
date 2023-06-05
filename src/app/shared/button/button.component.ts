import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  constructor(){
    this.buttonTypes='';
    this.buttonText='Default Text';
  }
  @Input()
  buttonTypes: string;
  @Input()
  buttonText: string;
  @Output()
  buttonClick=new EventEmitter<void>();

  clickHandler(){
    this.buttonClick.emit();
  }
}

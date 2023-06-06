import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition} from '@fortawesome/fontawesome-svg-core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  constructor(){
    this.buttonTypes='';
    this.buttonText='Default Text';
    this.iconType=faQuestion;
    this.iconClass='';
  }
  @Input()
  buttonTypes: string;
  @Input()
  buttonText: string;
  @Input()
  iconType: IconDefinition;
  @Input()
  iconClass: string;
  @Input()
  toShow = false;
  @Output()
  buttonClick=new EventEmitter<void>();

  clickHandler(){
    this.buttonClick.emit();
  }
}

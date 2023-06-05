import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  constructor(){
    this.labelText='';
    this.labelClass='';
    this.placeholderText='';
    this.idInput='';
    this.value='';
  }
@Input()
labelText: string;
@Input()
labelClass: string;
@Input()
placeholderText: string;
@Input()
idInput: string;
value;
}

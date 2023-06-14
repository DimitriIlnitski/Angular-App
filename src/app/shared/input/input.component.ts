import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  dispatchEvent(arg0: Event) {
    throw new Error('Method not implemented.');
  }
  @Input()
  labelText = '';
  @Input()
  labelClass = '';
  @Input()
  placeholderText = '';
  @Input()
  idInput = '';
  @Input()
  value = '';

  @Output()
  valueChange = new EventEmitter<string>();

  onValueChange() {
    this.valueChange.emit(this.value);
  }
}

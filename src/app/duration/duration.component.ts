import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css'],
})
export class DurationComponent {
  @Input()
  labelText = '';
  @Input()
  requiredText = '';
  @Input()
  labelClass = '';
  @Input()
  placeholderText = '';
  @Input()
  inputClass = '';
  @Input()
  inputType = 'text';
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

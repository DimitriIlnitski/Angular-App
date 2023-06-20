import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Output() searchValueChange = new EventEmitter<string>();
  @Output() buttonClick = new EventEmitter<void>();

  handleInputValueChange(value: string) {
    this.searchValueChange.emit(value);
  }

  handleButtonClick() {
    this.buttonClick.emit();
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  inputValue = '';

  @Output()
  searchValueChange = new EventEmitter<string>();

  @Output()
  searchBarClick = new EventEmitter<string>();

  handleValueChange(value: string) {
    this.inputValue = value;
    this.searchValueChange.emit(this.inputValue);
  }

  handleClick() {
    console.log(this.inputValue);
    this.searchBarClick.emit();
  }
}

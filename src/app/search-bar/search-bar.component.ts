import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
inputValue ='';

handleValueChange(value:string){
  this.inputValue = value;
}

handleClick(){
  console.log(this.inputValue);
}
}

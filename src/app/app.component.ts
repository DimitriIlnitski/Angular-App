import { Component } from '@angular/core';
import { LoadingBlockService } from './services/loading-block.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public loadingBlockService: LoadingBlockService) {}
}

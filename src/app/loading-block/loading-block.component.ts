import { Component } from '@angular/core';
import { LoadingBlockService } from '../services/loading-block.service';

@Component({
  selector: 'app-loading-block',
  templateUrl: './loading-block.component.html',
  styleUrls: ['./loading-block.component.css'],
})
export class LoadingBlockComponent {
  constructor(public loadingBlockService: LoadingBlockService) {}
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from 'src/app/services/course.service';
import { LoadingBlockService } from 'src/app/services/loading-block.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  constructor(public loadingBlockService: LoadingBlockService) {}

  @Input()
  buttonClass = '';
  @Input()
  buttonText = 'Default Text';
  @Input()
  iconType: IconDefinition = faQuestion;
  @Input()
  iconClass = '';
  @Input()
  toShow = false;
  @Output()
  buttonClick = new EventEmitter<void>();

  clickHandler() {
    this.buttonClick.emit();
  }
}

  import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
  } from '@angular/core';
  import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
  import { faQuestion } from '@fortawesome/free-solid-svg-icons';
  import { Store } from '@ngrx/store';
  import { Observable } from 'rxjs';
  import { selectIsLoading } from 'src/app/store/app.selector';

  @Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
  })
  export class ButtonComponent implements OnInit {
    constructor(private store: Store) {}

    @Input()
    buttonClass = '';
    @Input()
    buttonText = 'Default Text';
    @Input()
    buttonType='button'
    @Input()
    iconType: IconDefinition = faQuestion;
    @Input()
    iconClass = '';
    @Input()
    toShow = false;
    @Output()
    buttonClick = new EventEmitter<void>();

    isLoadingValue$!: Observable<boolean>;

    clickHandler() {
      this.buttonClick.emit();
    }

    ngOnInit() {
      this.isLoadingValue$ = this.store.select(selectIsLoading);
    }
  }

import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIfAuthenticated]',
})
export class IfAuthenticatedDirective implements OnChanges {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
  @Input() appIfAuthenticated = false;

  ngOnChanges(): void {
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this.appIfAuthenticated) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}

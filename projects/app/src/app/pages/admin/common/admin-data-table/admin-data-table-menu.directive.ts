import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

export class AdminDataTableMenuContext {
  constructor(
    public $implicit: any
  ) {}
}

@Directive({
  selector: '[adminDataTableMenu]'
})
export class AdminDataTableMenuDirective {
  constructor(readonly templateRef: TemplateRef<AdminDataTableMenuContext>) {}

  render(viewContainerRef: ViewContainerRef, item: any): void {
    if (!!viewContainerRef && item) {
      viewContainerRef.createEmbeddedView(
        this.templateRef,
        new AdminDataTableMenuContext(item)
      );
    }
  }
}

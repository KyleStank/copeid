import { Directive, EmbeddedViewRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

export class AdminDataTableMenuContext {
  constructor(
    public $implicit: any
  ) {}
}

@Directive({
  selector: '[adminDataTableMenu]'
})
export class AdminDataTableMenuDirective {
  embeddedViewRef?: EmbeddedViewRef<AdminDataTableMenuContext>;

  constructor(
    readonly templateRef: TemplateRef<AdminDataTableMenuContext>,
    readonly viewContainerRef: ViewContainerRef
  ) {}

  render(item: any) {
    this.viewContainerRef.clear();
    this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(
      this.templateRef,
      new AdminDataTableMenuContext(item)
    );
  }
}

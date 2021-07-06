import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[layoutHost]'
})
export class LayoutHostDirective {
  constructor(public readonly viewContainerRef: ViewContainerRef) {}
}

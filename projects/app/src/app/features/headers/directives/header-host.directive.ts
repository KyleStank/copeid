import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[headerHost]'
})
export class HeaderHostDirective {
  constructor(public readonly viewContainerRef: ViewContainerRef) {}
}

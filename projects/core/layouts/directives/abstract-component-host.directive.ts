import { Directive, ViewContainerRef } from '@angular/core';

@Directive()
export abstract class AbstractComponentHostDirective {
  constructor(public readonly viewContainerRef: ViewContainerRef) {}
}

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[footerHost]'
})
export class FooterHostDirective {
  constructor(public readonly viewContainerRef: ViewContainerRef) {}
}

import { Directive } from '@angular/core';

import { AbstractComponentHostDirective } from './abstract-component-host.directive';

@Directive({
  selector: '[layoutHost]'
})
export class LayoutHostDirective extends AbstractComponentHostDirective {}

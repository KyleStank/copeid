import { Directive } from '@angular/core';

import { AbstractComponentHostDirective } from './abstract-component-host.directive';

@Directive({
  selector: '[headerHost]'
})
export class HeaderHostDirective extends AbstractComponentHostDirective {}

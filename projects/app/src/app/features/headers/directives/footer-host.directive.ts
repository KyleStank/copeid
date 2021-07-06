import { Directive } from '@angular/core';

import { AbstractComponentHostDirective } from './abstract-component-host.directive';

@Directive({
  selector: '[footerHost]'
})
export class FooterHostDirective extends AbstractComponentHostDirective {}

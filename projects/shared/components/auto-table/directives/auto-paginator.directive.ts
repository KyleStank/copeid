import { Directive, Inject, Input, Optional } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Directive({
  selector: '[autoPaginator]',
  exportAs: 'autoPaginator'
})
export class AutoPaginatorDirective {
  @Input()
  controlManually = false;

  constructor(@Inject(MatPaginator) @Optional() readonly paginator: MatPaginator) {}
}

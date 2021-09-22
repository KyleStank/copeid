import { ContentChild, Directive } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Directive({
  selector: '[autoPaginator]'
})
export class AutoPaginatorDirective {
  @ContentChild(MatPaginator)
  paginator: MatPaginator | undefined;
}

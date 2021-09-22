import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AutoColumnDefDirective } from '../../directives';

@Component({
  selector: 'auto-header-cell',
  template: `
    <ng-template #default>
      {{ columnDef?.header }}
    </ng-template>
    <ng-template #override>
      <ng-container *ngTemplateOutlet="columnDef?.headerCellOverride?.templateRef || null"></ng-container>
    </ng-template>

    <ng-container *ngIf="!columnDef?.headerCellOverride?.templateRef then default else override"></ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoHeaderCellComponent {
  @Input()
  columnDef: AutoColumnDefDirective | undefined;
}

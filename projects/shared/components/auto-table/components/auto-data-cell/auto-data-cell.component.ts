import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AutoColumnDefDirective } from '../../directives';
import { AutoPropertyValuePipe } from '../../pipes';

@Component({
  selector: 'auto-data-cell',
  template: `
    <!-- Display default value from item property. -->
    <ng-template #defaultTemplate>
      {{ (item | autoPropertyValue : columnDef?.property) || default }}
    </ng-template>

    <!-- Display custom value from override directive. -->
    <ng-template #overrideTemplate>
      <ng-container *ngTemplateOutlet="
        columnDef?.dataCellOverride?.templateRef || null;
        context: { $implicit: item, index: index, rowIndex: rowIndex }
      "></ng-container>
    </ng-template>

    <ng-container *ngIf="!columnDef?.dataCellOverride?.templateRef then defaultTemplate else overrideTemplate"></ng-container>
  `,
  providers: [AutoPropertyValuePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoDataCellComponent {
  @Input()
  columnDef: AutoColumnDefDirective | undefined;

  @Input()
  item: any;

  @Input()
  index = -1;

  @Input()
  rowIndex = -1;

  @Input()
  default: any = '';
}

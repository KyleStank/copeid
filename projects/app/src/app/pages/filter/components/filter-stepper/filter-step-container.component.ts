import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FilterSectionPart, FilterSectionPartOption } from '@app/features';

@Component({
  selector: 'app-filter-step-container',
  templateUrl: './filter-step-container.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterStepContainerComponent {
  @Input()
  parts: FilterSectionPart[] = [];

  @Output()
  selected = new EventEmitter<FilterSectionPartOption>();
}

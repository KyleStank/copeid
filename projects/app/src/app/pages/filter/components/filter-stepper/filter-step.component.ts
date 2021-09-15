import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FilterSectionPartOption } from '@app/features';

@Component({
  selector: 'app-filter-step',
  templateUrl: './filter-step.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterStepComponent {
  @Input()
  option?: FilterSectionPartOption;
}

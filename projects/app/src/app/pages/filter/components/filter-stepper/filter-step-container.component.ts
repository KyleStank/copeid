import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FilterSection } from '@app/features';
import { FilterStepOptionDefinitionDirective } from './filter-stepper.directive';

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
  section?: FilterSection;

  @Input()
  optionDef?: FilterStepOptionDefinitionDirective;
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { FilterSectionPart, FilterSectionPartOption } from '@app/features';
import { FilterStepperComponent } from './filter-stepper.component';

@Component({
  selector: 'app-filter-step',
  templateUrl: './filter-step.component.html',
  styleUrls: ['./filter-step.component.scss'],
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterStepComponent {
  @Input()
  part?: FilterSectionPart;

  @Input()
  stepper?: FilterStepperComponent;

  @Output()
  selected = new EventEmitter<FilterSectionPartOption>();

  selectedOption?: FilterSectionPartOption;

  select(option: FilterSectionPartOption): void {
    this.selectedOption = option;
    this.selected.emit(this.selectedOption);
  }
}

import { ChangeDetectionStrategy, Component, ContentChild, Input, OnChanges, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatStepper } from '@angular/material/stepper';

import { FilterSection } from '@app/features';
import { FilterStepOptionDefinitionDirective } from './filter-stepper.directive';

@Component({
  selector: 'app-filter-stepper',
  templateUrl: './filter-stepper.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterStepperComponent implements OnChanges {
  @ContentChild(FilterStepOptionDefinitionDirective, { static: true })
  filterStepOptionDef?: FilterStepOptionDefinitionDirective;

  @ViewChild(MatStepper, { static: true })
  matStepper?: MatStepper;

  @Input()
  color?: ThemePalette = 'primary';

  @Input()
  sections: FilterSection[] = [];

  ngOnChanges(): void {
    this.sections = this.sections ?? [];
  }

  previous(): void {
    this.matStepper?.previous();
  }

  next(): void {
    this.matStepper?.next();
  }
}

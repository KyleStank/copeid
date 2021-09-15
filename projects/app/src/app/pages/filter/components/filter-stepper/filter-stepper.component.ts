import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { FilterSection } from '@app/features';

@Component({
  selector: 'app-filter-stepper',
  templateUrl: './filter-stepper.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterStepperComponent implements OnChanges {
  @Input()
  color?: ThemePalette = 'primary';

  @Input()
  sections: FilterSection[] = [];

  ngOnChanges(): void {
    this.sections = this.sections ?? [];
  }

  stop(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}

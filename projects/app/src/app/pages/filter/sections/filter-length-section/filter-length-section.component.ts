import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IFilterDefinition, IFilterOption, IFilterSection } from '../../models';

@Component({
  selector: 'app-filter-length-section',
  templateUrl: './filter-length-section.component.html',
  styleUrls: [
    '../filter-sections-common.scss',
    './filter-length-section.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterLengthSectionComponent implements IFilterSection {
  filterDefinition: IFilterDefinition<string, number> = {
    identifier: 'L',
    options: [
      { key: 'Z', value: 0.5 },
      { key: 'Y', value: 1.0 },
      { key: 'X', value: 1.5 },
      { key: 'W', value: 2.0 }
    ]
  };

  optionClicked(option: IFilterOption<string, number>): void {
    console.log('Option:', option);
  }

  resetLayout(): void {}
}

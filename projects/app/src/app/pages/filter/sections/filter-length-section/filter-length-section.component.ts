import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IFilterSection } from '../../models';

@Component({
  selector: 'app-filter-length-section',
  templateUrl: './filter-length-section.component.html',
  styleUrls: ['./filter-length-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterLengthSectionComponent implements IFilterSection {
  resetLayout(): void {}
}

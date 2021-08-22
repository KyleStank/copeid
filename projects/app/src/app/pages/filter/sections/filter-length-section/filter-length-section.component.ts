import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AbstractFilterSectionComponent } from '../filter-section.abstract.component';

@Component({
  selector: 'app-filter-length-section',
  templateUrl: './filter-length-section.component.html',
  styleUrls: ['./filter-length-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterLengthSectionComponent extends AbstractFilterSectionComponent {
  constructor() {
    super();

    console.log('Filter Length Section!');
  }
}

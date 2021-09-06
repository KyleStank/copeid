import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-filters',
  templateUrl: './admin-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersComponent {
  constructor() {
    console.log('Filters!');
  }
}

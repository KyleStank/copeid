import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-filter-model-properties',
  templateUrl: './admin-filter-model-properties.component.html',
  styleUrls: ['./admin-filter-model-properties.component.scss'],
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterModelPropertiesPageComponent {}

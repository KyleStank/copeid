import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-filter-models-manage-properties',
  templateUrl :'./admin-filter-models-manage-properties.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterModelsManagePropertiesComponent {

}

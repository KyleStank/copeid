import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilterService } from '@app/features';

@Component({
  selector: 'app-admin-filter-models-manage',
  templateUrl: './admin-filter-models-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterModelsManageComponent {

}

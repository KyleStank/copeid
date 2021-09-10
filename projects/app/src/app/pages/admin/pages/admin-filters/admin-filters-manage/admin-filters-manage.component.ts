import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilterService } from '@app/features';

@Component({
  selector: 'app-admin-filters-manage',
  templateUrl: './admin-filters-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersManageComponent {

}

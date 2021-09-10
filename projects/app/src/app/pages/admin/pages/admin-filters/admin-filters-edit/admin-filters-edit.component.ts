import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FilterService } from '@app/features';

@Component({
  selector: 'app-admin-filters-edit',
  templateUrl: './admin-filters-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersEditComponent {

}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SpecimenService } from '@app/features';

@Component({
  selector: 'app-admin-specimens-manage',
  templateUrl: './admin-specimens-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [SpecimenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSpecimensManageComponent {

}

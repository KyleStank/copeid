import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GenusService } from '@app/features';

@Component({
  selector: 'app-admin-genuses-edit',
  templateUrl: './admin-genuses-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [GenusService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGenusesEditComponent {

}

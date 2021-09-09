import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SpecimenService } from '@app/features';

@Component({
  selector: 'app-admin-specimens-edit',
  templateUrl: './admin-specimens-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [SpecimenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSpecimensEditComponent {

}

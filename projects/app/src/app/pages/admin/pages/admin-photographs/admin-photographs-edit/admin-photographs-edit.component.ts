import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PhotographService } from '@app/features';

@Component({
  selector: 'app-admin-photographs-edit',
  templateUrl: './admin-photographs-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [PhotographService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPhotographsEditComponent {

}

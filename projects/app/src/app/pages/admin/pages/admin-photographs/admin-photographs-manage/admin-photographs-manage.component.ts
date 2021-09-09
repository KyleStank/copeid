import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PhotographService } from '@app/features';

@Component({
  selector: 'app-admin-photographs-manage',
  templateUrl: './admin-photographs-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [PhotographService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPhotographsManageComponent {

}

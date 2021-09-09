import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DefinitionService } from '@app/features';

@Component({
  selector: 'app-admin-definitions-manage',
  templateUrl: './admin-definitions-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [DefinitionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDefinitionsManageComponent {

}

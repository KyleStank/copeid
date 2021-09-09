import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DefinitionService } from '@app/features';

@Component({
  selector: 'app-admin-definitions-edit',
  templateUrl: './admin-definitions-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [DefinitionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDefinitionsEditComponent {

}

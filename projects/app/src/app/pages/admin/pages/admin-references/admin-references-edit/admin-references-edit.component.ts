import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ReferenceService } from '@app/features';

@Component({
  selector: 'app-admin-references-edit',
  templateUrl: './admin-references-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [ReferenceService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReferencesEditComponent {

}

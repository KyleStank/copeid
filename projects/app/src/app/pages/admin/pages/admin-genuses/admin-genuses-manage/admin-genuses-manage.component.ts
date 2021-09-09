import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GenusService } from '@app/features';

@Component({
  selector: 'app-admin-genuses-manage',
  templateUrl: './admin-genuses-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [GenusService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGenusesManageComponent {

}

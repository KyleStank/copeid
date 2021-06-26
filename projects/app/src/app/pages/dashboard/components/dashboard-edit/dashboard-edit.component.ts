import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Copepod, CopepodService } from '@app/features';

@Component({
  selector: 'app-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CopepodService]
})
export class DashboardEditPageComponent {
  copepods: Copepod[] = [];

  constructor(private readonly _copepodService: CopepodService) {
    this._copepodService.getAllCopepods().subscribe(
      (copepods: Copepod[]) => {
        this.copepods = copepods;
        console.log('Copepods:', this.copepods);
      }
    );
  }
}

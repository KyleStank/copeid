import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Contributor, ContributorService } from '@app/features';
import { AbstractAdminPage, ENTITY_SETUP, ENTITY_SERVICE } from '../../abstracts';

const contributors = {
  singularName: 'Contributor',
  pluralName: 'Contributors'
};

@Component({
  selector: 'app-admin-contributors',
  templateUrl: './admin-contributors.component.html',
  styleUrls: ['./admin-contributors.component.scss'],
  providers: [
    ContributorService,
    { provide: ENTITY_SERVICE, useExisting: ContributorService },
    { provide: ENTITY_SETUP, useValue: contributors }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContributorsPageComponent extends AbstractAdminPage<Contributor> {}

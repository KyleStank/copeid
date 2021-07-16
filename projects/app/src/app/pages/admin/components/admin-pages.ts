import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Contributor, ContributorService } from '@app/features';
import { AdminEditModalComponent } from '../modals';
import { AbstractAdminPage, ENTITY_SETUP, ENTITY_SERVICE, ENTITY_EDIT_MODAL } from './admin-page.abstract';

@Component({
  selector: 'app-admin-contributors',
  templateUrl: './admin-page.abstract.html',
  styleUrls: ['./admin-page.abstract.scss'],
  providers: [
    ContributorService,
    { provide: ENTITY_SERVICE, useExisting: ContributorService },
    { provide: ENTITY_SETUP, useValue: { singularName: 'Contributor', pluralName: 'Contributors' } },
    { provide: ENTITY_EDIT_MODAL, useValue: AdminEditModalComponent }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContributorsPageComponent extends AbstractAdminPage<Contributor> {}

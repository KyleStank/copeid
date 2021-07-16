import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  Contributor,
  ContributorService,
  Definition,
  DefinitionService,
  Genus,
  GenusService,
  Photograph,
  PhotographService,
  Specimen,
  SpecimenService
} from '@app/features';
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

@Component({
  selector: 'app-admin-definitions',
  templateUrl: './admin-page.abstract.html',
  styleUrls: ['./admin-page.abstract.scss'],
  providers: [
    DefinitionService,
    { provide: ENTITY_SERVICE, useExisting: DefinitionService },
    { provide: ENTITY_SETUP, useValue: { singularName: 'Definition', pluralName: 'Definitions' } },
    // { provide: ENTITY_EDIT_MODAL, useValue: AdminEditModalComponent } // TODO: Change modal
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDefinitionsPageComponent extends AbstractAdminPage<Definition> {}

@Component({
  selector: 'app-admin-genuses',
  templateUrl: './admin-page.abstract.html',
  styleUrls: ['./admin-page.abstract.scss'],
  providers: [
    GenusService,
    { provide: ENTITY_SERVICE, useExisting: GenusService },
    { provide: ENTITY_SETUP, useValue: { singularName: 'Genus', pluralName: 'Genuses' } },
    // { provide: ENTITY_EDIT_MODAL, useValue: AdminEditModalComponent } // TODO: Change modal
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGenusesPageComponent extends AbstractAdminPage<Genus> {}

@Component({
  selector: 'app-admin-photographs',
  templateUrl: './admin-page.abstract.html',
  styleUrls: ['./admin-page.abstract.scss'],
  providers: [
    PhotographService,
    { provide: ENTITY_SERVICE, useExisting: PhotographService },
    { provide: ENTITY_SETUP, useValue: { singularName: 'Photograph', pluralName: 'Photographs' } },
    // { provide: ENTITY_EDIT_MODAL, useValue: AdminEditModalComponent } // TODO: Change modal
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPhotographsPageComponent extends AbstractAdminPage<Photograph> {}

@Component({
  selector: 'app-admin-specimens',
  templateUrl: './admin-page.abstract.html',
  styleUrls: ['./admin-page.abstract.scss'],
  providers: [
    SpecimenService,
    { provide: ENTITY_SERVICE, useExisting: SpecimenService },
    { provide: ENTITY_SETUP, useValue: { singularName: 'Specimen', pluralName: 'Specimens' } },
    // { provide: ENTITY_EDIT_MODAL, useValue: AdminEditModalComponent } // TODO: Change modal
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSpecimensPageComponent extends AbstractAdminPage<Specimen> {}

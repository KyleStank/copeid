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
  Reference,
  ReferenceService,
  Specimen,
  SpecimenService
} from '@app/features';
import {
  AdminContributorEditModal,
  AdminDefinitionEditModal,
  AdminGenusEditModal,
  AdminPhotographEditModal,
  AdminReferenceEditModal,
  AdminSpecimenEditModal
} from '../modals';
import { AbstractAdminPage, DataColumn, ENTITY_SERVICE } from './admin-page.abstract';

@Component({
  selector: 'app-admin-contributors',
  templateUrl: './admin-page.abstract.html',
  styleUrls: ['./admin-page.abstract.scss'],
  providers: [
    ContributorService,
    { provide: ENTITY_SERVICE, useExisting: ContributorService }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContributorsPageComponent extends AbstractAdminPage<Contributor> {
  public readonly singularName = 'Contributor';
  public readonly pluralName = 'Contributors';
  public readonly editModal = AdminContributorEditModal;
  public readonly dataColumns: DataColumn[] = [
    { title: 'Name', property: 'name' }
  ];
}

@Component({
  selector: 'app-admin-definitions',
  templateUrl: './admin-page.abstract.html',
  styleUrls: ['./admin-page.abstract.scss'],
  providers: [
    DefinitionService,
    { provide: ENTITY_SERVICE, useExisting: DefinitionService }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDefinitionsPageComponent extends AbstractAdminPage<Definition> {
  public readonly singularName = 'Definition';
  public readonly pluralName = 'Definitions';
  public readonly editModal = AdminDefinitionEditModal;
  public readonly dataColumns: DataColumn[] = [
    { title: 'Name', property: 'name' },
    { title: 'Meaning', property: 'meaning' }
  ];
}

@Component({
  selector: 'app-admin-genuses',
  templateUrl: './admin-page.abstract.html',
  styleUrls: ['./admin-page.abstract.scss'],
  providers: [
    GenusService,
    { provide: ENTITY_SERVICE, useExisting: GenusService }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGenusesPageComponent extends AbstractAdminPage<Genus> {
  public readonly singularName = 'Genus';
  public readonly pluralName = 'Genuses';
  public readonly editModal = AdminGenusEditModal;
  public readonly dataColumns: DataColumn[] = [
    { title: 'Name', property: 'name' }
  ];
}

@Component({
  selector: 'app-admin-photographs',
  templateUrl: './admin-page.abstract.html',
  styleUrls: ['./admin-page.abstract.scss'],
  providers: [
    PhotographService,
    { provide: ENTITY_SERVICE, useExisting: PhotographService }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPhotographsPageComponent extends AbstractAdminPage<Photograph> {
  public readonly singularName = 'Photograph';
  public readonly pluralName = 'Photographs';
  public readonly editModal = AdminPhotographEditModal;
  public readonly dataColumns: DataColumn[] = [
    { title: 'Title', property: 'title' },
    { title: 'Alt', property: 'alt' },
    { title: 'Description', property: 'description' },
    { title: 'Url', property: 'url' }
  ];
}

@Component({
  selector: 'app-admin-specimens',
  templateUrl: './admin-page.abstract.html',
  styleUrls: ['./admin-page.abstract.scss'],
  providers: [
    SpecimenService,
    { provide: ENTITY_SERVICE, useExisting: SpecimenService }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSpecimensPageComponent extends AbstractAdminPage<Specimen> {
  public readonly singularName = 'Specimen';
  public readonly pluralName = 'Specimens';
  public readonly editModal = AdminSpecimenEditModal;
  public readonly dataColumns: DataColumn[] = [
    { title: 'Genus', property: 'genus.name' },
    { title: 'Gender', property: 'gender' },
    { title: 'Length', property: 'length' }
  ];
  public maxEditorModalWidth = '1000px';
}

@Component({
  selector: 'app-admin-references',
  templateUrl: './admin-page.abstract.html',
  styleUrls: ['./admin-page.abstract.scss'],
  providers: [
    ReferenceService,
    { provide: ENTITY_SERVICE, useExisting: ReferenceService }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReferencesPageComponent extends AbstractAdminPage<Reference> {
  public readonly singularName = 'Reference';
  public readonly pluralName = 'References';
  public readonly editModal = AdminReferenceEditModal;
  public readonly dataColumns: DataColumn[] = [
    { title: 'Content', property: 'content' }
  ];
  public minEditorModalWidth = '500px';
}

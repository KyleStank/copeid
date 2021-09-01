import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgxEditorModule } from 'ngx-editor';

import { SharedConfirmationAlertModalModule } from '@shared/modals/confirmation-alert';
import { SharedSimpleTableModule } from '@shared/components/simple-table';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDataTableComponent } from './common';
import {
  AdminContributorsPageComponent,
  AdminDefinitionsPageComponent,
  AdminFilterPageComponent,
  AdminGenusesPageComponent,
  AdminPageComponent,
  AdminPhotographsPageComponent,
  AdminPropertyValuePipe,
  AdminReferencesPageComponent,
  AdminSpecimensPageComponent
} from './components';
import {
  AdminEditModalComponent,
  AdminTestComponent,
  AdminEditModalTitleComponent,
  AdminEditModalActionsComponent,
  AdminContributorEditModal,
  AdminDefinitionEditModal,
  AdminGenusEditModal,
  AdminPhotographEditModal,
  AdminReferenceEditModal,
  AdminSpecimenEditModal,
  AdminFilterModelEditModalComponent
} from './modals';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    NgxEditorModule,
    PortalModule,
    ReactiveFormsModule,
    SharedConfirmationAlertModalModule,
    SharedSimpleTableModule
  ],
  declarations: [
    // Common
    AdminDataTableComponent,

    // Components
    AdminContributorsPageComponent,
    AdminDefinitionsPageComponent,
    AdminFilterPageComponent,
    AdminGenusesPageComponent,
    AdminPageComponent,
    AdminPhotographsPageComponent,
    AdminReferencesPageComponent,
    AdminSpecimensPageComponent,

    // Modals
    AdminFilterModelEditModalComponent,
    AdminEditModalComponent,
    AdminTestComponent,
    AdminEditModalTitleComponent,
    AdminEditModalActionsComponent,
    AdminContributorEditModal,
    AdminDefinitionEditModal,
    AdminGenusEditModal,
    AdminPhotographEditModal,
    AdminReferenceEditModal,
    AdminSpecimenEditModal,

    // Pipes
    AdminPropertyValuePipe
  ]
})
export class AdminPageModule {}

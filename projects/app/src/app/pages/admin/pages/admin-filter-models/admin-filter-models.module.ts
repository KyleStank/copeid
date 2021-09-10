import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { SharedConfirmationAlertModalModule } from '@shared/modals/confirmation-alert';
import { AdminDataTableModule } from '../../common';
import { AdminFilterModelsEditComponent } from './admin-filter-models-edit';
import { AdminFilterModelsManageComponent } from './admin-filter-models-manage';
import { AdminFilterModelsRoutingModule } from './admin-filter-models-routing.module';

const exportedDeclarations: any[] = [
  AdminFilterModelsEditComponent,
  AdminFilterModelsManageComponent
];

@NgModule({
  imports: [
    AdminFilterModelsRoutingModule,
    AdminDataTableModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    SharedConfirmationAlertModalModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminFilterModelsModule {}

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
import { RouterModule } from '@angular/router';

import { SharedConfirmationAlertModalModule } from '@shared/modals/confirmation-alert';
import { AdminDataTableModule } from '../../common';
import { AdminSpecimensEditComponent } from './admin-specimens-edit';
import { AdminSpecimensManageComponent } from './admin-specimens-manage';
import { AdminSpecimensRoutingModule } from './admin-specimens-routing.module';

const exportedDeclarations = [
  AdminSpecimensEditComponent,
  AdminSpecimensManageComponent
];

@NgModule({
  imports: [
    AdminSpecimensRoutingModule,
    AdminDataTableModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    ReactiveFormsModule,
    RouterModule,
    SharedConfirmationAlertModalModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class AdminSpecimensModule {}

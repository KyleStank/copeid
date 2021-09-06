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
import { AdminContributorEditComponent } from './admin-contributor-edit/admin-contributor-edit.component';
import { AdminContributorsRoutingModule } from './admin-contributors-routing.module';
import { AdminContributorsComponent } from './admin-contributors.component';

const exportedDeclarations = [
  // Pages
  AdminContributorEditComponent,
  AdminContributorsComponent
];

@NgModule({
  imports: [
    AdminContributorsRoutingModule,
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
export class AdminContributorsModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { SnackBarModule } from '@core/services/snackbar';
import { SharedAutoTableModule } from '@shared/components/auto-table';
import { SharedConfirmationAlertModalModule } from '@shared/modals/confirmation-alert';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDataTableModule, AdminEditModule, AdminManageModule } from './components';

@NgModule({
  imports: [
    AdminRoutingModule,
    AdminEditModule,
    AdminDataTableModule,
    AdminManageModule,
    CommonModule,
    MatDialogModule,
    SharedAutoTableModule,
    SharedConfirmationAlertModalModule,
    SnackBarModule
  ]
})
export class AdminPageModule {}

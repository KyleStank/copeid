import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmationAlertModalCompoonent } from './confirmation-alert.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [ConfirmationAlertModalCompoonent],
  exports: [ConfirmationAlertModalCompoonent]
})
export class SharedConfirmationAlertModalModule {}

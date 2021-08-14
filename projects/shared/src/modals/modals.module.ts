import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmationAlertModalCompoonent } from './confirmation-alert/confirmation-alert.component';

const exportedDeclarations: any[] = [
  ConfirmationAlertModalCompoonent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class SharedModalsModule {}

import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmationAlertDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirmation-alert',
  templateUrl: './confirmation-alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationAlertModalCompoonent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationAlertModalCompoonent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationAlertDialogData
  ) {}
}

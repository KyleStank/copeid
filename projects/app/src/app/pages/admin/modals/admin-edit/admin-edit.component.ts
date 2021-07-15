import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AdminEditDialogData {
  name: string;
}

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEditModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AdminEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminEditDialogData
  ) {}
}

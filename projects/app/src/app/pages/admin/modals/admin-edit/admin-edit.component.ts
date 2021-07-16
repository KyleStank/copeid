import { ComponentPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, Inject, InjectionToken, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Contributor } from '@app/features';

export interface AdminEditDialogData {
  title: string;
  model: Contributor;
}

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEditModalComponent {
  model: Contributor;

  constructor(
    public readonly dialogRef: MatDialogRef<AdminEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: AdminEditDialogData
  ) {
    this.model = {
      ...(data?.model || {}),
      name: data?.model?.name || ''
    };
  }
}

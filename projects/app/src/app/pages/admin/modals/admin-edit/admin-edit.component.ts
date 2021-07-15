import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    public dialogRef: MatDialogRef<AdminEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminEditDialogData
  ) {
    this.model = {
      ...(data?.model || {}),
      name: data?.model?.name || ''
    };
  }

  createModel(model: Contributor): Contributor {
    console.log('Model:', model)
    return model;
  }
}

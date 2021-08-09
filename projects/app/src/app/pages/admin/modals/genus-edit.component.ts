import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Genus } from '@app/features';

export interface GenusEditDialogData {
  title: string;
  model: Genus;
}

@Component({
  selector: 'app-admin-genus-edit-modal',
  template: `
    <div mat-dialog-title>
      <h2>{{ data?.title }}</h2>
    </div>
    <div class="py-2" mat-dialog-content>
      <div class="row">
        <div class="col-md">
          <mat-form-field class="w-100" appearance="fill">
            <mat-label>Name</mat-label>

            <input
              #nameInput
              matInput
              required
              type="text"
              aria-label="Genus name text input."
              [(ngModel)]="model.name"
            />

            <mat-error>
              Field is required.
            </mat-error>
          </mat-form-field>
        </div>
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="warn" [mat-dialog-close]="null">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="nameInput.value?.length === 0" [mat-dialog-close]="model">Save</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGenusEditModal {
  model: Genus;

  constructor(
    public readonly dialogRef: MatDialogRef<AdminGenusEditModal>,
    @Inject(MAT_DIALOG_DATA) @Optional() public readonly data?: GenusEditDialogData
  ) {
    this.model = {
      ...(data?.model || {}),
      id: data?.model?.id || null,
      name: data?.model?.name || '',
      photograph: data?.model?.photograph || null,
      photographId: data?.model?.photographId || null,
      specimens: data?.model?.specimens || null
    };
  }
}

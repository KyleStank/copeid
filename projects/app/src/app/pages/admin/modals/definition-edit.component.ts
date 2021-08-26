import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Definition } from '@app/features';

export interface DefinitionEditDialogData {
  title: string;
  model: Definition;
}

@Component({
  selector: 'app-admin-definition-edit-modal',
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
              aria-label="Definition name text input."
              [(ngModel)]="model.name"
            />

            <mat-error>
              Field is required.
            </mat-error>
          </mat-form-field>
        </div>

        <div class="col-md">
          <mat-form-field class="w-100" appearance="fill">
            <mat-label>Meaning</mat-label>

            <input
              #meaningInput
              matInput
              required
              type="text"
              aria-label="Definition meaning text input."
              [(ngModel)]="model.meaning"
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
      <button
        mat-raised-button
        color="primary"
        [disabled]="nameInput.value?.length === 0 || meaningInput.value?.length === 0"
        [mat-dialog-close]="model"
      >
        Save
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDefinitionEditModal {
  model: Definition;

  constructor(
    public readonly dialogRef: MatDialogRef<AdminDefinitionEditModal>,
    @Inject(MAT_DIALOG_DATA) @Optional() public readonly data?: DefinitionEditDialogData
  ) {
    this.model = {
      ...(data?.model || {}),
      id: data?.model?.id || undefined,
      name: data?.model?.name || '',
      meaning: data?.model?.meaning || ''
    };
  }
}

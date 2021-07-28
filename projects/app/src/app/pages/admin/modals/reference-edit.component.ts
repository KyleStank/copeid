import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Reference } from '@app/features';

export interface ReferenceEditDialogData {
  title: string;
  model: Reference;
}

@Component({
  selector: 'app-admin-reference-edit-modal',
  template: `
    <div mat-dialog-title>
      <h2>{{ data?.title }}</h2>
    </div>
    <div class="py-2" mat-dialog-content>
      <div class="row">
        <div class="col-md-auto">
          <mat-form-field class="w-100" appearance="fill">
            <mat-label>Content</mat-label>

            <input
              #contentInput
              matInput
              required
              type="text"
              aria-label="Reference content text input."
              [(ngModel)]="model.content"
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
        [disabled]="contentInput.value?.length === 0"
        [mat-dialog-close]="model"
      >
        Save
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReferenceEditModal {
  model: Reference;

  constructor(
    public readonly dialogRef: MatDialogRef<AdminReferenceEditModal>,
    @Inject(MAT_DIALOG_DATA) @Optional() public readonly data?: ReferenceEditDialogData
  ) {
    this.model = {
      ...(data?.model || {}),
      id: data?.model?.id || null,
      content: data?.model?.content || ''
    };
  }
}

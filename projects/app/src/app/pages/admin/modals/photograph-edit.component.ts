import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Photograph } from '@app/features';

export interface PhotographEditDialogData {
  title: string;
  model: Photograph;
}

@Component({
  selector: 'app-admin-photograph-edit-modal',
  template: `
    <div mat-dialog-title>
      <h2>{{ data?.title }}</h2>
    </div>
    <div class="py-2" mat-dialog-content>
      <div class="row">
        <div class="col-md">
          <mat-form-field class="my-1 w-100" appearance="fill">
            <mat-label>Title</mat-label>

            <input
              #titleInput
              matInput
              required
              type="text"
              aria-label="Photograph title text input."
              [(ngModel)]="model.title"
            />

            <mat-error>
              Field is required.
            </mat-error>
          </mat-form-field>

          <mat-form-field class="my-1 w-100" appearance="fill">
            <mat-label>Description</mat-label>

            <input
              #descInput
              matInput
              required
              type="text"
              aria-label="Photograph description text input."
              [(ngModel)]="model.description"
            />

            <mat-error>
              Field is required.
            </mat-error>
          </mat-form-field>
        </div>

        <div class="col-md">
          <mat-form-field class="my-1 w-100" appearance="fill">
            <mat-label>Alt</mat-label>

            <input
              #altInput
              matInput
              required
              type="text"
              aria-label="Photograph alt text input."
              [(ngModel)]="model.alt"
            />

            <mat-error>
              Field is required.
            </mat-error>
          </mat-form-field>

          <mat-form-field class="my-1 w-100" appearance="fill">
            <mat-label>URL</mat-label>

            <input
              #urlInput
              matInput
              required
              type="text"
              aria-label="Photograph URL text input."
              [(ngModel)]="model.url"
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
        [disabled]="
          titleInput.value?.length === 0 ||
          altInput.value?.length === 0 ||
          descInput.value?.length === 0 ||
          urlInput.value?.length === 0
        "
        [mat-dialog-close]="model"
      >
        Save
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPhotographEditModal {
  model: Photograph;

  constructor(
    public readonly dialogRef: MatDialogRef<AdminPhotographEditModal>,
    @Inject(MAT_DIALOG_DATA) @Optional() public readonly data?: PhotographEditDialogData
  ) {
    this.model = {
      ...(data?.model || {}),
      id: data?.model?.id || null,
      title: data?.model?.title || '',
      description: data?.model?.description || '',
      alt: data?.model?.alt || '',
      url: data?.model?.url || ''
    };
  }
}

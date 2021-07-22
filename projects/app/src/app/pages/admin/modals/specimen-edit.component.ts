import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Specimen, SpecimenGender } from '@app/features';

export interface SpecimenEditDialogData {
  title: string;
  model: Specimen;
}

@Component({
  selector: 'app-admin-specimen-edit-modal',
  template: `
    <div mat-dialog-title>
      <h2>{{ data?.title }}</h2>
    </div>
    <div class="py-2" mat-dialog-content>
      <div class="row">
        <div class="col-md-auto">
          <mat-form-field class="w-100" appearance="fill">
            <mat-label>Gender</mat-label>

            <mat-select
              #genderInput
              aria-label="Specimen gender dropdown input."
              required
              [(ngModel)]="model.gender"
            >
              <mat-option [value]="enumSpecimenGender.Male">Male</mat-option>
              <mat-option [value]="enumSpecimenGender.Female">Female</mat-option>
            </mat-select>

            <mat-error>
              Field is required.
            </mat-error>
          </mat-form-field>
        </div>

        <div class="col-md-auto">
          <mat-form-field class="w-100" appearance="fill">
            <mat-label>Length</mat-label>

            <input
              #lengthInput
              matInput
              required
              type="number"
              aria-label="Specimen length number input."
              [(ngModel)]="model.length"
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
        [disabled]="genderInput.value?.length === 0 || lengthInput.value?.length === 0"
        [mat-dialog-close]="model"
      >
        Save
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSpecimenEditModal {
  readonly enumSpecimenGender: typeof SpecimenGender = SpecimenGender;

  model: Specimen;

  constructor(
    public readonly dialogRef: MatDialogRef<AdminSpecimenEditModal>,
    @Inject(MAT_DIALOG_DATA) @Optional() public readonly data?: SpecimenEditDialogData
  ) {
    this.model = {
      ...(data?.model || {}),
      id: data?.model?.id || null,
      gender: data?.model?.gender || SpecimenGender.Male,
      length: data?.model?.length || 0,
      genusId: data?.model?.genusId || null,
      genus: data?.model?.genus || null,
      photographId: data?.model?.photographId || null,
      photograph: data?.model?.photograph || null
    };
  }
}

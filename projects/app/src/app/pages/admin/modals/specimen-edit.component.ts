import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Genus, GenusService, Specimen, SpecimenGender } from '@app/features';

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
      <form #form="ngForm" (ngSubmit)="onSubmit(form)">
        <div class="row my-1">
          <div class="col-md">
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Genus</mat-label>

              <mat-select required name="genusId" [(ngModel)]="model.genusId">
                <mat-option *ngFor="let genus of genuses" [value]="genus.id">
                  {{ genus.name }}
                </mat-option>
              </mat-select>

              <mat-error>
                Field is required
              </mat-error>
            </mat-form-field>
          </div>

          <div class="col-md">
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Gender</mat-label>

              <mat-select
                #genderInput
                required
                aria-label="Specimen gender dropdown input."
                name="gender"
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

          <div class="col-md">
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Length</mat-label>

              <input
                matInput
                required
                type="number"
                aria-label="Specimen Length input."
                name="length"
                [(ngModel)]="model.length"
              />

              <mat-error>
                Field is required.
              </mat-error>
            </mat-form-field>
          </div>
        </div>

        <div class="row my-1">
          <div class="col-md">
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Special Characteristics</mat-label>

              <textarea
                matInput
                required
                cdkTextareaAutosize
                cdkAutosizeMinRows="2"
                cdkAutosizeMaxRows="5"
                aria-label="Specimen Special Characteristics input."
                name="specialCharacteristics"
                [(ngModel)]="model.specialCharacteristics"
              ></textarea>

              <mat-error>
                Field is required.
              </mat-error>
            </mat-form-field>
          </div>
        </div>

        <div class="row my-1">
          <div class="col-md">
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Antenule</mat-label>

              <textarea
                matInput
                required
                cdkTextareaAutosize
                cdkAutosizeMinRows="2"
                cdkAutosizeMaxRows="5"
                aria-label="Specimen Antenule input."
                name="antenule"
                [(ngModel)]="model.antenule"
              ></textarea>

              <mat-error>
                Field is required.
              </mat-error>
            </mat-form-field>
          </div>

          <div class="col-md">
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Rostrum</mat-label>

              <textarea
                matInput
                required
                cdkTextareaAutosize
                cdkAutosizeMinRows="2"
                cdkAutosizeMaxRows="5"
                aria-label="Specimen Rostrum input."
                name="rostrum"
                [(ngModel)]="model.rostrum"
              ></textarea>

              <mat-error>
                Field is required.
              </mat-error>
            </mat-form-field>
          </div>

          <div class="col-md">
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Body Shape</mat-label>

              <textarea
                matInput
                required
                cdkTextareaAutosize
                cdkAutosizeMinRows="2"
                cdkAutosizeMaxRows="5"
                aria-label="Specimen Body Shape input."
                name="bodyShape"
                [(ngModel)]="model.bodyShape"
              ></textarea>

              <mat-error>
                Field is required.
              </mat-error>
            </mat-form-field>
          </div>
        </div>

        <div class="row my-1">
          <div class="col-md">
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Eyes</mat-label>

              <textarea
                matInput
                required
                cdkTextareaAutosize
                cdkAutosizeMinRows="2"
                cdkAutosizeMaxRows="5"
                aria-label="Specimen Eyes input."
                name="eyes"
                [(ngModel)]="model.eyes"
              ></textarea>

              <mat-error>
                Field is required.
              </mat-error>
            </mat-form-field>
          </div>

          <div class="col-md">
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Cephalosome</mat-label>

              <textarea
                matInput
                required
                cdkTextareaAutosize
                cdkAutosizeMinRows="2"
                cdkAutosizeMaxRows="5"
                aria-label="Specimen Cephalosome input."
                name="cephalosome"
                [(ngModel)]="model.cephalosome"
              ></textarea>

              <mat-error>
                Field is required.
              </mat-error>
            </mat-form-field>
          </div>

          <div class="col-md">
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Thorax</mat-label>

              <textarea
                matInput
                required
                cdkTextareaAutosize
                cdkAutosizeMinRows="2"
                cdkAutosizeMaxRows="5"
                aria-label="Specimen Thorax input."
                name="thorax"
                [(ngModel)]="model.thoraxDescription"
              ></textarea>

              <mat-error>
                Field is required.
              </mat-error>
            </mat-form-field>
          </div>
        </div>

        <div class="row my-1">
          <div class="col-md">
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Urosome</mat-label>

              <textarea
                matInput
                required
                cdkTextareaAutosize
                cdkAutosizeMinRows="2"
                cdkAutosizeMaxRows="5"
                aria-label="Specimen Urosome input."
                name="urosome"
                [(ngModel)]="model.urosome"
              ></textarea>

              <mat-error>
                Field is required.
              </mat-error>
            </mat-form-field>
          </div>

          <div class="col-md">
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Furca</mat-label>

              <textarea
                matInput
                required
                cdkTextareaAutosize
                cdkAutosizeMinRows="2"
                cdkAutosizeMaxRows="5"
                aria-label="Specimen Furca input."
                name="furca"
                [(ngModel)]="model.furca"
              ></textarea>

              <mat-error>
                Field is required.
              </mat-error>
            </mat-form-field>
          </div>

          <div class="col-md">
            <mat-form-field class="w-100" appearance="fill">
              <mat-label>Setea</mat-label>

              <textarea
                matInput
                required
                cdkTextareaAutosize
                cdkAutosizeMinRows="2"
                cdkAutosizeMaxRows="5"
                aria-label="Specimen Setea input."
                name="setea"
                [(ngModel)]="model.setea"
              ></textarea>

              <mat-error>
                Field is required.
              </mat-error>
            </mat-form-field>
          </div>
        </div>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="warn" [mat-dialog-close]="null">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        [disabled]="form.invalid"
        [mat-dialog-close]="model"
      >
        Save
      </button>
    </div>
  `,
  providers: [GenusService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSpecimenEditModal {
  readonly enumSpecimenGender: typeof SpecimenGender = SpecimenGender;

  model: Specimen;
  genuses: Genus[] = [];

  constructor(
    private readonly _genusService: GenusService,
    public readonly dialogRef: MatDialogRef<AdminSpecimenEditModal>,
    @Inject(MAT_DIALOG_DATA) @Optional() public readonly data?: SpecimenEditDialogData
  ) {
    this.model = {
      ...(data?.model || {}),

      // Basic Information
      id: data?.model?.id || undefined,
      genusId: data?.model?.genusId || undefined,
      genus: data?.model?.genus || undefined,
      photographId: data?.model?.photographId || undefined,
      photograph: data?.model?.photograph || undefined,
      gender: data?.model?.gender || SpecimenGender.Male,
      length: data?.model?.length || 0,
      summary: data?.model?.summary || undefined,
      specialCharacteristics: data?.model?.specialCharacteristics || undefined,

      // Antenule
      antenuleDescription: data?.model?.antenuleDescription || undefined,
      antenule: data?.model?.antenule || undefined,

      // Rostrum
      rostrumDescription: data?.model?.rostrumDescription || undefined,
      rostrum: data?.model?.rostrum || undefined,

      // Body Shape
      bodyShapeDescription: data?.model?.bodyShapeDescription || undefined,
      bodyShape: data?.model?.bodyShape || undefined,

      // Eyes
      eyesDescription: data?.model?.eyesDescription || undefined,
      eyes: data?.model?.eyes || undefined,

      // Cephalosome
      cephalosomeDescription: data?.model?.cephalosomeDescription || undefined,
      cephalosome: data?.model?.cephalosome || undefined,

      // Thorax
      thoraxDescription: data?.model?.thoraxDescription || undefined,
      thoraxSegments: data?.model?.thoraxSegments || undefined,
      thoraxShape: data?.model?.thoraxShape || undefined,

      // Urosome
      urosomeDescription: data?.model?.urosomeDescription || undefined,
      urosome: data?.model?.urosome || undefined,

      // Furca
      furcaDescription: data?.model?.furcaDescription || undefined,
      furca: data?.model?.furca || undefined,

      // Setea
      seteaDescription: data?.model?.seteaDescription || undefined,
      setea: data?.model?.setea || undefined
    };

    this._genusService.getAll().subscribe({
      next: genuses => this.genuses = genuses
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.dialogRef.close(this.model);
    }
  }
}

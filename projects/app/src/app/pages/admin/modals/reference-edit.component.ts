import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Editor, toDoc, toHTML, Toolbar } from 'ngx-editor';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
        <div class="col-md">
          <form [formGroup]="formGroup">
            <div class="NgxEditor__Wrapper">
              <ngx-editor-menu [editor]="editor" [toolbar]="toolbar"></ngx-editor-menu>
              <ngx-editor [editor]="editor" formControlName="content"></ngx-editor>
            </div>

            <mat-error class="my-1" *ngIf="formGroup.controls['content'].errors">
              Field is required.
            </mat-error>
          </form>
        </div>
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="warn" [mat-dialog-close]="null">Cancel</button>
      <button
        mat-raised-button
        color="primary"
        [disabled]="formGroup.invalid"
        [mat-dialog-close]="save()"
      >
        Save
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReferenceEditModal implements OnDestroy {
  private readonly _destroyed = new Subject<void>();

  readonly editor: Editor = new Editor();
  readonly toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike']
  ];
  readonly formGroup!: FormGroup;

  model!: Reference;

  constructor(
    public readonly detectorRef: ChangeDetectorRef,
    public readonly dialogRef: MatDialogRef<AdminReferenceEditModal>,
    @Inject(MAT_DIALOG_DATA) @Optional() public readonly data?: ReferenceEditDialogData
  ) {
    this.model = {
      ...(data?.model || {}),
      id: data?.model?.id || null,
      content: data?.model?.content || ''
    };

    this.formGroup = new FormGroup({
      content: new FormControl(toDoc(this.model.content as string), this.editorValidator)
    });

    // Change detection is required to detect errors in the view.
    this.formGroup.valueChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this.detectorRef.markForCheck());
  }

  editorValidator(control: AbstractControl): ValidationErrors | null {
    const htmlValue = toHTML(control.value)?.replace(/<\/?[^>]+(>|$)/g, '') ?? '';
    return htmlValue.length === 0 ? { editorInvalid: true } : null;
  }

  save(): any {
    this.model.content = toHTML(this.formGroup.get('content')?.value);
    return this.model;
  }

  ngOnDestroy(): void {
    this.editor.destroy();

    this._destroyed.next();
    this._destroyed.complete();
  }
}

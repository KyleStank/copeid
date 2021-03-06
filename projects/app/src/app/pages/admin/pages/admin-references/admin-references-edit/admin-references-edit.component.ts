import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Editor, toDoc } from 'ngx-editor';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { Reference, ReferenceService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-references-edit',
  templateUrl: './admin-references-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [ReferenceService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReferencesEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<Reference | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  get valid(): boolean { return this.formGroup.valid; }
  readonly formGroup = this._fb.group({
    content: ['', Validators.required]
  });
  readonly editor = new Editor();

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _fb: FormBuilder,
    private readonly _referenceService: ReferenceService
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            content: result.content
          });
        }

        this.formGroup.markAllAsTouched();
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id') ?? undefined;
    if (!!this.id) {
      this._referenceService.getSingle(this.id).subscribe({
        next: result => {
          if (!!result.content) {
            this.editor.setContent(toDoc(result.content));
          }

          this._modelSubject.next(result);
        }
      });
    }
  }

  save(): Observable<Reference> {
    const model: Reference = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.id
    };

    return !!model.id ? this._referenceService.update(model) : this._referenceService.create(model);
  }

  ngOnDestroy(): void {
    this.editor.destroy();

    this.destroyed.next();
    this.destroyed.complete();
  }
}

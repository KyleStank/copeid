import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, map, mergeMap, Observable, Subject, takeUntil } from 'rxjs';

import { Document, DocumentService } from '@app/features';
import { SnackBarService } from '@core/services/snackbar';
import { convertFile } from '@shared/utils';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-documents-edit',
  templateUrl: './admin-documents-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [DocumentService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDocumentsEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<Document | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  get valid(): boolean { return this.formGroup.valid; }
  get dataControl(): AbstractControl { return this.formGroup.get('data')!; }
  readonly formGroup = this._fb.group({
    name: ['', Validators.required],
    data: [null, Validators.required]
  });

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _documentService: DocumentService,
    private readonly _fb: FormBuilder,
    private readonly _snackbarService: SnackBarService
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            name: result.name
          });
        }

        this.formGroup.markAllAsTouched();
        this._changeDetectorRef.markForCheck();
      }
    });

    this.dataControl.valueChanges.pipe(
      takeUntil(this.destroyed),
      distinctUntilChanged(),
      mergeMap((data: File) => this._documentService.verifyMime(data?.type))
    ).subscribe({
      next: valid => {
        if (!valid) {
          this._snackbarService.open('Unsupported File Type!');
          this.dataControl.setValue(null);
        }
      }
    });
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id') ?? undefined;
    if (!!this.id) {
      this._documentService.getSingle(this.id).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }
  }

  save(): Observable<Document> {
    const file: File = this.formGroup.get('data')!.value;
    return convertFile(file).pipe(
      map(data => new Document({
        ...(this._modelSubject.value ?? {}),
        ...this.formGroup.value,
        id: this.id,
        path: this._modelSubject.value?.path ?? 'worthless_value_that_is_overwritten_on_server', // TODO: Adjust models to NOT require path.
        mimeType: file.type,
        data
      })),
      mergeMap(model => !!model.id ? this._documentService.update(model) : this._documentService.create(model))
    );
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

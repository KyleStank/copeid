import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { Document, DocumentService, Photograph, PhotographService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-photographs-edit',
  templateUrl: './admin-photographs-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [DocumentService, PhotographService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPhotographsEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<Photograph | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  private readonly _documentsSubject = new BehaviorSubject<Document[]>([]);
  readonly documents$ = this._documentsSubject.asObservable();

  get valid() { return this.formGroup.valid; }
  readonly formGroup = this._fb.group({
    documentId: ['', Validators.required],
    title: ['', Validators.required],
    description: ['']
  });

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _documentService: DocumentService,
    private readonly _fb: FormBuilder,
    private readonly _photographService: PhotographService
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.documents$ = this.documents$.pipe(takeUntil(this.destroyed));

    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            documentId: result.documentId,
            title: result.title,
            description: result.description
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
      this._photographService.getSingle(this.id).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }

    this._documentService.getAll({
      orderBy: ['name']
    }).subscribe(this._documentsSubject.next.bind(this._documentsSubject));
  }

  save(): Observable<Photograph> {
    const model: Photograph = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.id
    };

    return !!model.id ? this._photographService.update(model) : this._photographService.create(model);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

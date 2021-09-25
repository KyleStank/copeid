import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { DocumentService, Genus, GenusService, Photograph, PhotographService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-genuses-edit',
  templateUrl: './admin-genuses-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [DocumentService, GenusService, PhotographService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGenusesEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<Genus | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  private readonly _photographsSubject = new BehaviorSubject<Photograph[]>([]);
  readonly photographs$ = this._photographsSubject.asObservable();

  get valid(): boolean { return this.formGroup.valid; }
  readonly formGroup = this._fb.group({
    photographId: [''],
    name: ['', Validators.required]
  });

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _documentService: DocumentService,
    private readonly _fb: FormBuilder,
    private readonly _genusService: GenusService,
    private readonly _photographService: PhotographService
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.photographs$ = this.photographs$.pipe(takeUntil(this.destroyed));

    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            photographId: result.photographId,
            name: result.name
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
      this._genusService.getSingle(this.id).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }

    this._photographService.getAll({
      include: ['document'],
      orderBy: ['title']
    }).subscribe(this._photographsSubject.next.bind(this._photographsSubject));
  }

  save(): Observable<Genus> {
    const model: Genus = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.id
    };

    return !!model.id ? this._genusService.update(model) : this._genusService.create(model);
  }

  previewPhotograph(id: string): void {
    const photograph = this._photographsSubject.value.find(p => p.id === id);
    if (!!photograph?.documentId) {
      this._documentService.getDocumentUri(photograph.documentId).subscribe({
        next: uri => window.open(uri, '_blank')?.focus()
      });
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

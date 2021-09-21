import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { DocumentService, Photograph, PhotographService } from '@app/features';
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

  get valid() { return this.formGroup.valid; }
  readonly formGroup = this._fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    alt: [''],
    url: ['']
  });

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _fb: FormBuilder,
    private readonly _photographService: PhotographService
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            title: result.title,
            description: result.description,
            alt: result.alt,
            url: result.url
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

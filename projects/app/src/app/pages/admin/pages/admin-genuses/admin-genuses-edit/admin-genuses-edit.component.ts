import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { Genus, GenusService, Specimen, SpecimenService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-genuses-edit',
  templateUrl: './admin-genuses-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [GenusService, SpecimenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGenusesEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<Genus | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  private readonly _specimensSubject = new BehaviorSubject<Specimen[]>([]);
  readonly specimens$ = this._specimensSubject.asObservable();

  readonly formGroup = this._fb.group({
    name: ['', Validators.required]
  });

  id: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _fb: FormBuilder,
    private readonly _genusService: GenusService,
    private readonly _specimenService: SpecimenService
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

    this.specimens$ = this.specimens$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id') ?? undefined;
    if (!!this.id) {
      this._genusService.getSingle(this.id).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }

    this._specimenService.getAll({
      orderBy: ['genus.name']
    }).subscribe(this._specimensSubject.next.bind(this._specimensSubject));
  }

  save(): Observable<Genus> {
    const model: Genus = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.id
    };

    return !!model.id ? this._genusService.update(model) : this._genusService.create(model);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

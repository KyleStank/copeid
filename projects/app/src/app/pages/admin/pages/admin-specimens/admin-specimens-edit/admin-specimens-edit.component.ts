import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { Genus, GenusService, Specimen, SpecimenGender, SpecimenService } from '@app/features';
import { IAdminEditView } from '../../../components';

@Component({
  selector: 'app-admin-specimens-edit',
  templateUrl: './admin-specimens-edit.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [GenusService, SpecimenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSpecimensEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<Specimen | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  private readonly _genusesSubject = new BehaviorSubject<Genus[]>([]);
  readonly genuses$ = this._genusesSubject.asObservable();

  readonly formGroup = this._fb.group({
    genusId: [null, Validators.required],
    gender: [null, Validators.required],
    length: [0, Validators.compose([Validators.required, Validators.min(0)])],
    specialCharacteristics: ['', Validators.required],
    antenule: ['', Validators.required],
    rostrum: ['', Validators.required],
    bodyShape: ['', Validators.required],
    eyes: ['', Validators.required],
    cephalosome: ['', Validators.required],
    thorax: ['', Validators.required],
    urosome: ['', Validators.required],
    furca: ['', Validators.required],
    setea: ['', Validators.required],
  });
  readonly enumSpecimenGender: typeof SpecimenGender = SpecimenGender;

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
            genusId: result.genusId,
            gender: result.gender,
            length: result.length,
            specialCharacteristics: result.specialCharacteristics,
            antenule: result.antenule,
            rostrum: result.rostrum,
            bodyShape: result.bodyShape,
            eyes: result.eyes,
            cephalosome: result.cephalosome,
            thorax: result.thorax,
            urosome: result.urosome,
            furca: result.furca,
            setea: result.setea
          });
        }

        this.formGroup.markAllAsTouched();
        this._changeDetectorRef.markForCheck();
      }
    });

    this.genuses$ = this.genuses$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id') ?? undefined;
    if (!!this.id) {
      this._specimenService.getSingle(this.id).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }

    this._genusService.getAll({
      orderBy: ['name']
    }).subscribe(this._genusesSubject.next.bind(this._genusesSubject));
  }

  save(): Observable<Specimen> {
    const model: Specimen = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.id
    };

    return !!model.id ? this._specimenService.update(model) : this._specimenService.create(model);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

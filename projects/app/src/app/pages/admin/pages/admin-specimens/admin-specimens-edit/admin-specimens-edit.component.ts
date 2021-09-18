import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import {
  Genus,
  GenusService,
  Specimen,
  SpecimenEyes,
  SpecimenFurca,
  SpecimenGender,
  SpecimenService,
  SpecimenThoraxSegments,
  SpecimenThoraxShape,
  SpecimenSetea
} from '@app/features';
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
    // Basic Information
    genusId: [null, Validators.required],
    gender: [null, Validators.required],
    length: [0, Validators.compose([Validators.required, Validators.min(0)])],
    specialCharacteristics: [null, Validators.required],

    // Antenule
    antenuleDescription: [null, Validators.required],
    antenule: [null, Validators.required],

    // Rostrum
    rostrumDescription: [null, Validators.required],
    rostrum: [null, Validators.required],

    // Body Shape
    bodyShapeDescription: [null, Validators.required],
    bodyShape: [null, Validators.required],

    // Eyes
    eyesDescription: [null, Validators.required],
    eyes: [null, Validators.required],

    // Cephalosome
    cephalosomeDescription: [null, Validators.required],
    cephalosome: [null, Validators.required],

    // Thorax
    thoraxDescription: [null, Validators.required],
    thoraxSegments: [null, Validators.required],
    thoraxShape: [null, Validators.required],

    // Urosome
    urosomeDescription: [null, Validators.required],
    urosome: [null, Validators.required],

    // Furca
    furcaDescription: [null, Validators.required],
    furca: [null, Validators.required],

    // Setea
    seteaDescription: [null, Validators.required],
    setea: [null, Validators.required]
  });
  readonly enumSpecimenEyes: typeof SpecimenEyes = SpecimenEyes;
  readonly enumSpecimenFurca: typeof SpecimenFurca = SpecimenFurca;
  readonly enumSpecimenGender: typeof SpecimenGender = SpecimenGender;
  readonly enumSpecimenThoraxSegments: typeof SpecimenThoraxSegments = SpecimenThoraxSegments;
  readonly enumSpecimenThoraxShape: typeof SpecimenThoraxShape = SpecimenThoraxShape;
  readonly enumSpecimenSetea: typeof SpecimenSetea = SpecimenSetea;

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
            // Basic Information
            genusId: result.genusId,
            gender: result.gender,
            length: result.length,
            specialCharacteristics: result.specialCharacteristics,

            // Antenule
            antenuleDescription: result.antenuleDescription,
            antenule: result.antenule,

            // Rostrum
            rostrumDescription: result.rostrumDescription,
            rostrum: result.rostrum,

            // Body Shape
            bodyShapeDescription: result.bodyShapeDescription,
            bodyShape: result.bodyShape,

            // Eyes
            eyesDescription: result.eyesDescription,
            eyes: result.eyes,

            // Cephalosome
            cephalosomeDescription: result.cephalosomeDescription,
            cephalosome: result.cephalosome,

            // Thorax
            thoraxDescription: result.thoraxDescription,
            thoraxSegments: result.thoraxSegments,
            thoraxShape: result.thoraxShape,

            // Urosome
            urosomeDescription: result.urosomeDescription,
            urosome: result.urosome,

            // Furca
            furcaDescription: result.furcaDescription,
            furca: result.furca,

            // Setea
            seteaDescription: result.seteaDescription,
            setea: result.setea
          } as Specimen);
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

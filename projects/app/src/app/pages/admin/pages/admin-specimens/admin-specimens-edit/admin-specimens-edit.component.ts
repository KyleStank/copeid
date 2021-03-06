import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import {
  DocumentService,
  Genus,
  GenusService,
  Photograph,
  PhotographService,
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
  providers: [DocumentService, GenusService, PhotographService, SpecimenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSpecimensEditComponent implements IAdminEditView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _modelSubject = new BehaviorSubject<Specimen | undefined>(undefined);
  readonly model$ = this._modelSubject.asObservable();

  private readonly _genusesSubject = new BehaviorSubject<Genus[]>([]);
  readonly genuses$ = this._genusesSubject.asObservable();

  private readonly _photographsSubject = new BehaviorSubject<Photograph[]>([]);
  readonly photographs$ = this._photographsSubject.asObservable();

  get valid(): boolean { return this.formGroup.valid; }
  readonly formGroup = this._fb.group({
    // Basic Information
    genusId: [null, Validators.required],
    photographId: [null],
    gender: [null, Validators.required],
    length: [0, Validators.compose([Validators.required, Validators.min(0)])],
    summary: [null],
    specialCharacteristics: [null],

    // Antenule
    antenuleDescription: [null],
    antenule: [null, Validators.required],

    // Rostrum
    rostrumDescription: [null],
    rostrum: [null, Validators.required],

    // Body Shape
    bodyShapeDescription: [null],
    bodyShape: [null, Validators.required],

    // Eyes
    eyesDescription: [null],
    eyes: [null, Validators.required],

    // Cephalosome
    cephalosomeDescription: [null],
    cephalosome: [null, Validators.required],

    // Thorax
    thoraxDescription: [null],
    thoraxSegments: [null, Validators.required],
    thoraxShape: [null, Validators.required],

    // Urosome
    urosomeDescription: [null],
    urosome: [null, Validators.required],

    // Furca
    furcaDescription: [null],
    furca: [null, Validators.required],

    // Setea
    seteaDescription: [null],
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
    private readonly _documentService: DocumentService,
    private readonly _fb: FormBuilder,
    private readonly _genusService: GenusService,
    private readonly _photographService: PhotographService,
    private readonly _specimenService: SpecimenService
  ) {
    this.model$ = this.model$.pipe(takeUntil(this.destroyed));
    this.genuses$ = this.genuses$.pipe(takeUntil(this.destroyed));
    this.photographs$ = this.photographs$.pipe(takeUntil(this.destroyed));

    this.model$.subscribe({
      next: result => {
        if (!!result) {
          this.formGroup.patchValue({
            // Basic Information
            genusId: result.genusId,
            photographId: result.photographId,
            gender: result.gender,
            length: result.length,
            summary: result.summary,
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
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id') ?? undefined;
    if (!!this.id) {
      this._specimenService.getSingle(this.id).subscribe(this._modelSubject.next.bind(this._modelSubject));
    }

    this._genusService.getAll({
      orderBy: ['name']
    }).subscribe(this._genusesSubject.next.bind(this._genusesSubject));

    this._photographService.getAll({
      include: ['document'],
      orderBy: ['title']
    }).subscribe(this._photographsSubject.next.bind(this._photographsSubject));
  }

  save(): Observable<Specimen> {
    const model: Specimen = {
      ...(this._modelSubject.value ?? {}),
      ...this.formGroup.value,
      id: this.id
    };

    return !!model.id ? this._specimenService.update(model) : this._specimenService.create(model);
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

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, from, map, mergeMap, Observable, Subject, take, takeUntil, toArray } from 'rxjs';

import { DocumentService, GenusDisplay, Specimen, SpecimenDisplay, SpecimenService } from '@app/features';
import { ISpecimenFilterValue } from '../../components';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [DocumentService, SpecimenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _specimensSubject = new BehaviorSubject<SpecimenDisplay[]>([]);
  readonly specimens$ = this._specimensSubject.asObservable();

  private readonly _filteredSpecimensSubject = new BehaviorSubject<SpecimenDisplay[]>([]);
  readonly filteredSpecimens$ = this._filteredSpecimensSubject.asObservable();

  constructor(
    private readonly _documentService: DocumentService,
    private readonly _specimenService: SpecimenService
  ) {
    this.specimens$ = this.specimens$.pipe(takeUntil(this._destroyed));
    this.filteredSpecimens$ = this.filteredSpecimens$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this._specimenService.getAll({
      include: ['genus', 'genus.photograph', 'photograph'],
      orderBy: ['genus.name']
    }).pipe(
      mergeMap(results => from(results).pipe(
        mergeMap(model => this._getSpecimenPhotoUri$(model)),
        toArray()
      ))
    ).subscribe({
      next: results => {
        this._specimensSubject.next(results);
        this._filteredSpecimensSubject.next(results);
      }
    });
  }

  private _getSpecimenPhotoUri$(model: Specimen | SpecimenDisplay): Observable<SpecimenDisplay> {
    const empty$ = new Observable<undefined>(sub => {
      sub.next(undefined);
      sub.complete();
    });

    return combineLatest([
      !!model.photograph?.documentId ? this._documentService.getDocumentUri(model.photograph.documentId) : empty$,
      !!model.genus?.photograph?.documentId ? this._documentService.getDocumentUri(model.genus.photograph.documentId) : empty$
    ]).pipe(
      take(1),
      map(([specimenUri, genusUri]) =>
        new SpecimenDisplay({
          ...model,
          genus: new GenusDisplay(model.genus, genusUri)
        }, specimenUri)
      )
    );
  }

  filterChange(filterValue: ISpecimenFilterValue): void {
    this._filteredSpecimensSubject.next(this._specimensSubject.value.filter(specimen => {
      const genusName = specimen.genus!.name!;
      const gender = specimen.gender!;
      const length = specimen.length!;
      const antenule = specimen.antenule!;
      const rostrum = specimen.rostrum!;
      const bodyShape = specimen.bodyShape!;
      const eyes = specimen.eyes!;
      const cephalosome = specimen.cephalosome!;
      const thoraxSegments = specimen.thoraxSegments!;
      const thoraxShape = specimen.thoraxShape!;
      const urosome = specimen.urosome!;
      const furca = specimen.furca!;
      const setea = specimen.setea!;

      return (
        (filterValue.genusName == null || filterValue.genusName.trim().length === 0)
        || genusName.toLowerCase().includes(filterValue.genusName.toLowerCase())
      ) && (filterValue.gender == null || gender === filterValue.gender)
        && (filterValue.lengthGreaterThan == null || length >= filterValue.lengthGreaterThan)
        && (filterValue.lengthLessThan == null || length <= filterValue.lengthLessThan)
        && (
          (filterValue.antenule == null || filterValue.antenule.trim().length === 0)
          || antenule.toLowerCase().includes(filterValue.antenule.toLowerCase())
        ) && (
          (filterValue.rostrum == null || filterValue.rostrum.trim().length === 0)
          || rostrum.toLowerCase().includes(filterValue.rostrum.toLowerCase())
        ) && (
          (filterValue.bodyShape == null || filterValue.bodyShape.trim().length === 0)
          || bodyShape.toLowerCase().includes(filterValue.bodyShape.toLowerCase())
        ) && (filterValue.eyes == null || eyes === filterValue.eyes)
        && (filterValue.cephalosome == null || cephalosome === filterValue.cephalosome)
        && (filterValue.thoraxSegments == null || thoraxSegments === filterValue.thoraxSegments)
        && (filterValue.thoraxShape == null || thoraxShape === filterValue.thoraxShape)
        && (filterValue.urosome == null || urosome === filterValue.urosome)
        && (filterValue.furca == null || furca === filterValue.furca)
        && (filterValue.setea == null || setea === filterValue.setea);
    }));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

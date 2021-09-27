import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, mergeMap, Observable, Subject, take, takeUntil } from 'rxjs';

import { DocumentService, GenusDisplay, Specimen, SpecimenDisplay, SpecimenService } from '@app/features';

@Component({
  selector: 'app-info-single',
  templateUrl: './info-single.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [DocumentService, SpecimenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoSinglePageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _specimenSubject = new BehaviorSubject<SpecimenDisplay | undefined>(undefined);
  readonly specimen$ = this._specimenSubject.asObservable();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _documentService: DocumentService,
    private readonly _specimenService: SpecimenService,
    private readonly _router: Router
  ) {
    this.specimen$ = this.specimen$.pipe(takeUntil(this._destroyed));

    const specimenResult: Specimen = this._router.getCurrentNavigation()?.extras.state?.result;
    if (!!specimenResult) {
      this._getSpecimenPhotoUri$(specimenResult).subscribe({
        next: result => this._specimenSubject.next(result)
      });
    }
  }

  ngOnInit(): void {
    if (!!!this._specimenSubject.value) {
      const id = this._activatedRoute.snapshot.paramMap.get('id');
      if (!!id) {
        this._specimenService.getSingle(id, {
          include: ['genus', 'genus.photograph', 'photograph']
        }).pipe(
          mergeMap(result => this._getSpecimenPhotoUri$(result))
        ).subscribe({
          next: result => this._specimenSubject.next(result)
        });
      }
    }
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

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

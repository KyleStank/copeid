import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, mergeMap, Observable, of, Subject, takeUntil } from 'rxjs';

import { DocumentService, Specimen, SpecimenDisplay, SpecimenService } from '@app/features';

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
          include: ['genus', 'photograph']
        }).pipe(
          mergeMap(result => this._getSpecimenPhotoUri$(result))
        ).subscribe({
          next: result => this._specimenSubject.next(result)
        });
      }
    }
  }

  private _getSpecimenPhotoUri$(model: Specimen | SpecimenDisplay): Observable<SpecimenDisplay> {
    if (!!model.photograph?.documentId) {
      return this._documentService.getDocumentUri(model.photograph.documentId).pipe(
        map(result => new SpecimenDisplay(model, result))
      );
    } else {
      return of(new SpecimenDisplay(model, undefined));
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

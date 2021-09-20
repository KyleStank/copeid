import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { Specimen, SpecimenService } from '@app/features';

@Component({
  selector: 'app-info-single',
  templateUrl: './info-single.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [SpecimenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoSinglePageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _specimenSubject = new BehaviorSubject<Specimen | undefined>(undefined);
  readonly specimen$ = this._specimenSubject.asObservable();

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _specimenService: SpecimenService,
    private readonly _router: Router
  ) {
    this.specimen$ = this.specimen$.pipe(takeUntil(this._destroyed));

    const specimenResult: Specimen = this._router.getCurrentNavigation()?.extras.state?.result;
    if (!!specimenResult) this._specimenSubject.next(specimenResult);
  }

  ngOnInit(): void {
    if (!!!this._specimenSubject.value) {
      const id = this._activatedRoute.snapshot.paramMap.get('id');
      if (!!id) {
        this._specimenService.getSingle(id, {
          include: ['genus', 'photograph']
        }).subscribe({
          next: specimen => this._specimenSubject.next(specimen)
        });
      }
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

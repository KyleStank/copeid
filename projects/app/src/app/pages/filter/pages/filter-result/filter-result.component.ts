import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { Specimen, SpecimenEyes, SpecimenService } from '@app/features';

@Component({
  selector: 'app-filter-result',
  templateUrl: './filter-result.component.html',
  styleUrls: ['./filter-result.component.scss'],
  host: {
    'class': 'd-block'
  },
  providers: [SpecimenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterResultPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _specimenSubject = new BehaviorSubject<Specimen | undefined>(undefined);
  readonly specimen$ = this._specimenSubject.asObservable();

  readonly enumSpecimenEyes: typeof SpecimenEyes = SpecimenEyes;

  code: string | undefined;

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
    this.code = this._activatedRoute.snapshot.queryParamMap.get('code') ?? undefined;

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

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private readonly _specimenService: SpecimenService
  ) {
    this.specimen$ = this.specimen$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (!!id) {
      this.code = this._activatedRoute.snapshot.queryParamMap.get('code') ?? undefined;

      this._specimenService.getSingle(id, {
        include: ['genus', 'photograph']
      }).subscribe({
        next: specimen => this._specimenSubject.next(specimen)
      });
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
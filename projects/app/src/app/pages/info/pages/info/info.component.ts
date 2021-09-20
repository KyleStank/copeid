import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';

import { Specimen, SpecimenService } from '@app/features';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [SpecimenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _specimensSubject = new BehaviorSubject<Specimen[]>([]);
  readonly specimens$ = this._specimensSubject.asObservable();

  private readonly _filteredSpecimensSubject = new BehaviorSubject<Specimen[]>([]);
  readonly filteredSpecimens$ = this._filteredSpecimensSubject.asObservable();

  constructor(private readonly _specimenService: SpecimenService) {
    this.specimens$ = this.specimens$.pipe(takeUntil(this._destroyed));
    this.filteredSpecimens$ = this.filteredSpecimens$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    // this._specimenService.getInfoSpecimens().subscribe({
    //   next: specimens => {
    //     console.log(specimens);
    //   }
    // });
    this._specimenService.getAll({
      include: ['genus', 'photograph']
    }).pipe(
      map(specimens => specimens.sort((a, b) => a.genus!.name! > b.genus!.name! ? 1 : -1))
    ).subscribe({
      next: specimens => {
        this._specimensSubject.next(specimens);
        this._filteredSpecimensSubject.next(specimens);
      }
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

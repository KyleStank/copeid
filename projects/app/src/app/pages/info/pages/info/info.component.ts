import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

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

  constructor(private readonly _specimenService: SpecimenService) {
    this.specimens$ = this.specimens$.pipe(takeUntil(this._destroyed));
    this.specimens$.subscribe(console.log);
  }

  ngOnInit(): void {
    // this._specimenService.getInfoSpecimens().subscribe({
    //   next: specimens => {
    //     console.log(specimens);
    //   }
    // });
    this._specimenService.getAll({
      include: ['genus', 'photograph']
    }).subscribe({
      next: specimens => this._specimensSubject.next(specimens.sort((a, b) => a.genus!.name! > b.genus!.name! ? 1 : -1))
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

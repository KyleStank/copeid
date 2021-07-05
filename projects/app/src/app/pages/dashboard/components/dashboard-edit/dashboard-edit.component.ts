import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  Genus,
  GenusService,
  Photograph,
  PhotographService,
  Specimen,
  SpecimenService
} from '@app/features';

@Component({
  selector: 'app-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GenusService, PhotographService, SpecimenService]
})
export class DashboardEditPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _genuses = new BehaviorSubject<Genus[]>([]);
  readonly genuses$: Observable<Genus[]>;

  private readonly _photographs = new BehaviorSubject<Photograph[]>([]);
  readonly photographs$: Observable<Photograph[]>;

  private readonly _specimens = new BehaviorSubject<Specimen[]>([]);
  readonly specimens$: Observable<Specimen[]>;

  constructor(
    private readonly _genusService: GenusService,
    private readonly _photographService: PhotographService,
    private readonly _specimenService: SpecimenService
  ) {
    this.genuses$ = this._genuses.asObservable()
      .pipe(takeUntil(this._destroyed));

    this.photographs$ = this._photographs.asObservable()
      .pipe(takeUntil(this._destroyed));

    this.specimens$ = this._specimens.asObservable()
      .pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this._genusService.getAllEntities().subscribe(this._genuses.next.bind(this._genuses));
    this._photographService.getAllEntities().subscribe(this._photographs.next.bind(this._photographs));
    this._specimenService.getAllEntities().subscribe(this._specimens.next.bind(this._specimens));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

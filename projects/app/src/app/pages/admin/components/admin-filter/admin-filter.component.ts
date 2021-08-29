import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { Filter, FilterModel, FilterModelService, FilterService } from '@app/features';

@Component({
  selector: 'app-admin-filter',
  templateUrl: './admin-filter.component.html',
  styleUrls: ['./admin-filter.component.scss'],
  providers: [
    FilterModelService,
    FilterService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _filterModelsSubject = new BehaviorSubject<FilterModel[]>([]);
  readonly filterModels$ = this._filterModelsSubject.asObservable();

  private readonly _filtersSubject = new BehaviorSubject<Filter[]>([]);
  readonly filters$ = this._filtersSubject.asObservable();

  constructor(
    private readonly _filterModelService: FilterModelService,
    private readonly _filterService: FilterService
  ) {
    this.filterModels$ = this.filterModels$.pipe(takeUntil(this._destroyed));
    this.filters$ = this.filters$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this._filterModelService.getAll().subscribe(this._filterModelsSubject.next.bind(this._filterModelsSubject));
    this._filterService.getAll().subscribe(this._filtersSubject.next.bind(this._filtersSubject));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

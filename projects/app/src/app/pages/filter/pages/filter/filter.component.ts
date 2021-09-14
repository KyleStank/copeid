import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable, skipWhile, Subject, takeUntil, tap } from 'rxjs';

import { Filter, FilterModel, FilterModelProperty, FilterModelService, FilterSection, FilterSectionService, FilterService } from '@app/features';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterService, FilterModelService, FilterSectionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _filterSubject = new BehaviorSubject<Filter | undefined>(undefined);
  readonly filter$ = this._filterSubject.asObservable();

  private readonly _filterModelSubject = new BehaviorSubject<FilterModel | undefined>(undefined);
  readonly filterModel$ = this._filterModelSubject.asObservable();
  readonly filterModelProperties$: Observable<FilterModelProperty[]>;

  private readonly _filterSectionsSubject = new BehaviorSubject<FilterSection[]>([]);
  readonly filterSections$ = this._filterSectionsSubject.asObservable();

  private readonly _currentFilterSectionSubject = new BehaviorSubject<FilterSection | undefined>(undefined);
  readonly currentFilterSection$ = this._currentFilterSectionSubject.asObservable();

  constructor(
    private readonly _filterService: FilterService,
    private readonly _filterModelService: FilterModelService,
    private readonly _filterSectionService: FilterSectionService
  ) {
    this.filter$ = this.filter$.pipe(takeUntil(this._destroyed));

    this.filterModel$ = this._filterModelSubject.pipe(takeUntil(this._destroyed));
    this.filterModelProperties$ = this.filterModel$.pipe(
      skipWhile(filterModel => !!!filterModel?.filterModelProperties),
      map(filterModel => filterModel!.filterModelProperties!)
    );

    this.filterSections$ = this._filterSectionsSubject.pipe(takeUntil(this._destroyed));

    this.currentFilterSection$ = this._currentFilterSectionSubject.pipe(takeUntil(this._destroyed));
    this.currentFilterSection$.subscribe(console.log);
  }

  ngOnInit(): void {
    this._filterService.getAll({
      include: ['filterModel']
    }).pipe(
      map(filters => filters.find(f => f.filterModel?.typeName === 'CopeID.Models.Specimens.Specimen')),
      tap(filter => {
        this._filterModelService.getSingle(filter!.filterModelId!, {
          include: ['filterModelProperties']
        }).subscribe(this._filterModelSubject.next.bind(this._filterModelSubject));

        this._filterSectionService.getAll({
          filterId: [filter!.id!]
        }).pipe(
          tap(filterSections => this._currentFilterSectionSubject.next(filterSections[0]))
        ).subscribe(this._filterSectionsSubject.next.bind(this._filterSectionsSubject));
      })
    ).subscribe(this._filterSubject.next.bind(this._filterSubject));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';

import { Filter, FilterModel, FilterSection, FilterService } from '@app/features';
import { FilterStepperResult } from '../../components';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _filterSubject = new BehaviorSubject<Filter | undefined>(undefined);
  readonly filter$ = this._filterSubject.asObservable();
  readonly filterModel$: Observable<FilterModel | undefined>;
  readonly filterSections$: Observable<FilterSection[]>;

  @ViewChild(MatStepper, { static: true })
  stepper?: MatStepper;

  constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _filterService: FilterService
  ) {
    this.filter$ = this.filter$.pipe(takeUntil(this._destroyed));
    this.filterModel$ = this.filter$.pipe(
      map(filter => filter?.filterModel)
    );
    this.filterSections$ = this.filter$.pipe(
      map(filter => filter?.filterSections ?? [])
    );
  }

  ngOnInit(): void {
    this._filterService.getSpecimenFilter().subscribe({
      next: filter => this._filterSubject.next(filter)
    });
  }

  filtered(results: FilterStepperResult[]): void {
    this._filterService.getFilterResult({
      filterId: this._filterSubject.value?.id!,
      results
    }).subscribe({
      next: result => {
        console.log('IDs:', result.filteredIds);
        console.log('Code:', result.formattedCode);
      },
      error: err => console.error('Error While Filtering:', err)
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '@core/services/snackbar';
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

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _filterService: FilterService,
    private readonly _snackbarService: SnackBarService,
    private readonly _router: Router
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
        if (result.filteredIds.length > 0) {
          if (result.filteredIds.length === 1) {
            this._snackbarService.close(); // Close any snackbar that may still be open.

            this._router.navigate(
              ['result', result.filteredIds[0]],
              {
                relativeTo: this._activatedRoute,
                queryParams: {
                  code: encodeURIComponent(result.formattedCode)
                }
              }
            );
          } else {
            console.log('Multiple!');
          }
        } else {
          this._snackbarService.open('No results found! Try selecting different options.', {
            action: 'Okay',
            duration: 5000
          });
        }
      },
      error: err => console.error('Error While Filtering:', err)
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

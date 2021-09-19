import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, skipWhile, Subject, takeUntil } from 'rxjs';

import { Filter, FilterModel, FilterSection, FilterService } from '@app/features';
import { IEntity } from '@core/models/entity';
import { SnackBarService } from '@core/services/snackbar';
import { FilterResultSelectionModalComponent, IFilterResultSelectionModalData } from './filter-result-selection';
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
    private readonly _dialog: MatDialog,
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
        const filteredResults = result.filteredResults ?? [];
        if (filteredResults.length > 0) {
          if (filteredResults.length === 1) { // Navigate to result page if single result was found.
            if (!!filteredResults[0]) this._viewResult(filteredResults[0], result.formattedCode);
          } else { // Open result selection modal if multiple results were found.
            this._openSelectionModal(filteredResults).subscribe({
              next: id => {
                const selected = filteredResults.find(r => r.id === id);
                if (!!selected) this._viewResult(selected, result.formattedCode);
              }
            });
          }
        } else { // If not results were found, notify user.
          this._snackbarService.open('No results found! Try selecting different options.', {
            action: 'Okay',
            duration: 5000
          });
        }
      },
      error: err => console.error('Error While Filtering:', err)
    });
  }

  private _openSelectionModal(filteredResults: IEntity[]): Observable<string | undefined> {
    const dialogRef = this._dialog.open<FilterResultSelectionModalComponent, IFilterResultSelectionModalData, string>(
      FilterResultSelectionModalComponent, {
        data: {
          results: filteredResults,
          displayProperty: 'genus.name',
          infoProperties: [
            { key: 'Genus', value: 'genus.name' },
            { key: 'Length (mm)', value: 'length' },
            { key: 'Eyes', value: 'eyesDescription' },
            { key: 'Cephalosome', value: 'cephalosomeDescription' },
            { key: 'Thorax', value: 'thoraxDescription' },
            { key: 'Urosome', value: 'urosomeDescription' },
            { key: 'Furca', value: 'furcaDescription' },
            { key: 'Setea', value: 'seteaDescription' }
          ]
        },
        width: '700px'
      }
    );

    return dialogRef.afterClosed().pipe(
      takeUntil(this._destroyed),
      skipWhile(id => !!!id)
    );
  }

  private _viewResult(result: IEntity, code: string): void {
    this._snackbarService.close(); // Close any snackbar that may still be open.

    this._router.navigate(
      ['result', result.id],
      {
        relativeTo: this._activatedRoute,
        state: { result },
        queryParams: {
          code: encodeURIComponent(code)
        }
      }
    );
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

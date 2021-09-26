import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, from, map, Observable, skipWhile, Subject, takeUntil, tap, toArray } from 'rxjs';

import { FilterModelProperty, FilterModelPropertyQuery, FilterModelPropertyService } from '@app/features';
import { PaginationRequest } from '@core/models/pagination';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-filter-models-manage-properties',
  templateUrl :'./admin-filter-models-manage-properties.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterModelPropertyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterModelsManagePropertiesComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _filterModelPropertiesSubject = new BehaviorSubject<FilterModelProperty[]>([]);
  readonly filterModelProperties$ = this._filterModelPropertiesSubject.asObservable();

  public readonly columns: AdminColumn[] = [
    { title: 'Property Name', property: 'propertyName' }
  ];
  selectedItems: any[] = [];
  paginatorLength = 0;
  pageIndex = 0;
  pageSize = 10;
  cachedData: FilterModelProperty[][] = [];
  get pageCount(): number { return Math.ceil(this.paginatorLength / this.pageSize); }
  sortDirection: 'asc' | 'desc' | undefined;

  filterModelId: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _filterModelPropertySerivce: FilterModelPropertyService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.filterModelProperties$ = this.filterModelProperties$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(refreshCache: boolean = false): void {
    this.filterModelId = this._activatedRoute.snapshot.paramMap.get('filterModelId') ?? undefined;
    if (!!this.filterModelId) {
      this._getPagedEntities$(this.pageIndex, this.pageSize, refreshCache, {
        filterModelId: [this.filterModelId],
        orderBy: this.sortDirection === 'asc' ? ['propertyName'] : [],
        orderByDescending: this.sortDirection === 'desc' ? ['propertyName'] : []
      }).subscribe({
        next: results => this._filterModelPropertiesSubject.next(results)
      });
    }
  }

  private _getPagedEntities$(pageIndex: number, pageSize: number, refreshCache: boolean, query?: Partial<FilterModelPropertyQuery>): Observable<FilterModelProperty[]> {
    const cachedItems = this.cachedData[pageIndex] ?? [];
    if (!refreshCache && (this.cachedData.length === this.pageCount && cachedItems.length > 0)) {
      return from(cachedItems).pipe(toArray());
    }

    return this._filterModelPropertySerivce.getAllPaged(new PaginationRequest(pageIndex + 1, pageSize), query).pipe(
      tap(response => {
        this.paginatorLength = response?.count ?? this.paginatorLength;
        this.cachedData = !refreshCache && this.cachedData.length === this.pageCount ? this.cachedData : new Array(this.pageCount).fill([]);
        this.cachedData[pageIndex] = response?.data ?? [];
      }),
      map(response => response?.data ?? [])
    );
  }

  editAddItem(model?: FilterModelProperty): void {
    const params = ['edit'];
    this._router.navigate(!!model?.id ? [...params, model.id] : params, { relativeTo: this._activatedRoute });
  }

  deleteItems(models?: FilterModelProperty[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Filter Model Property' : 'Filter Model Properties';
    const dialogRef = this._dialog.open(ConfirmationAlertModalCompoonent, {
      data: {
        title: `Delete ${modelName}?`,
        message: `Are you sure you want to delete ${isSingle ? 'this' : 'these'} ${modelName}?`
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroyed),
        skipWhile((result: boolean) => !result)
      ).subscribe({
        next: () => {
          models!.forEach(m => {
            if (!!m?.id) {
              this._filterModelPropertySerivce.delete(m.id).subscribe({
                next: () => this.getEntities(true),
                error: (error: any) => console.error('Error:', error)
              });
            }
          });
        }
      });
  }

  sortChange(sort: Sort): void {
    this.sortDirection = sort.direction !== '' ? sort.direction : undefined;
    this.getEntities(true);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, from, map, Observable, skipWhile, Subject, takeUntil, tap, toArray } from 'rxjs';

import { Filter, FilterQuery, FilterService } from '@app/features';
import { PaginationRequest } from '@core/models/pagination';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn, IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-filters-manage',
  templateUrl: './admin-filters-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _filtersSubject = new BehaviorSubject<Filter[]>([]);
  readonly filters$ = this._filtersSubject.asObservable();
  readonly columns: AdminColumn[] = [
    { title: 'Display Name', property: 'displayName' },
    { title: 'Filter Model', property: 'filterModel.typeName' }
  ];
  selectedItems: any[] = [];
  paginatorLength = 0;
  pageIndex = 0;
  pageSize = 10;
  cachedData: Filter[][] = [];
  get pageCount(): number { return Math.ceil(this.paginatorLength / this.pageSize); }
  sort?: Sort = undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _filterService: FilterService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.filters$ = this.filters$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(refreshCache: boolean = false): void {
    this._getPagedEntities$(this.pageIndex, this.pageSize, refreshCache, {
      include: ['filterModel'],
      orderBy: this.sort?.direction === 'asc' ? [this.sort.active] : [],
      orderByDescending: this.sort?.direction === 'desc' ? [this.sort.active] : []
    }).subscribe({
      next: results => this._filtersSubject.next(results)
    });
  }

  private _getPagedEntities$(pageIndex: number, pageSize: number, refreshCache: boolean, query?: Partial<FilterQuery>): Observable<Filter[]> {
    const cachedItems = this.cachedData[pageIndex] ?? [];
    if (!refreshCache && (this.cachedData.length === this.pageCount && cachedItems.length > 0)) {
      return from(cachedItems).pipe(toArray());
    }

    return this._filterService.getAllPaged(new PaginationRequest(pageIndex + 1, pageSize), query).pipe(
      tap(response => {
        this.paginatorLength = response?.count ?? this.paginatorLength;
        this.cachedData = !refreshCache && this.cachedData.length === this.pageCount ? this.cachedData : new Array(this.pageCount).fill([]);
        this.cachedData[pageIndex] = response?.data ?? [];
      }),
      map(response => response?.data ?? [])
    );
  }

  editAddItem(model?: Filter): void {
    const params = ['edit'];
    this._router.navigate(!!model?.id ? [...params, model.id] : params, { relativeTo: this._activatedRoute });
  }

  viewSections(model: Filter): void {
    this._router.navigate([model.id, 'sections'], { relativeTo: this._activatedRoute });
  }

  deleteItems(models?: Filter[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Filter' : 'Filters';
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
              this._filterService.delete(m.id).subscribe({
                next: () => this.getEntities(true),
                error: (error: any) => console.error('Error:', error)
              });
            }
          });
        }
      });
  }

  sortChange(sort: Sort): void {
    this.sort = sort.direction !== '' ? sort : undefined;
    this.getEntities(true);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

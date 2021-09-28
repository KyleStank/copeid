import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, from, map, Observable, skipWhile, Subject, takeUntil, tap, toArray } from 'rxjs';

import { FilterSectionPart, FilterSectionPartQuery, FilterSectionPartService } from '@app/features';
import { PaginationRequest } from '@core/models/pagination';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-filters-sections-parts-manage',
  templateUrl: './admin-filter-sections-parts-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterSectionPartService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersSectionsPartsManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _filterSectionPartsSubject = new BehaviorSubject<FilterSectionPart[]>([]);
  readonly filterSectionParts$ = this._filterSectionPartsSubject.asObservable();

  public readonly columns: AdminColumn[] = [
    { title: 'Display Name', property: 'displayName' },
    { title: 'Property', property: 'filterModelProperty.propertyName' },
    { title: 'Order', property: 'order' }
  ];
  selectedItems: any[] = [];
  paginatorLength = 0;
  pageIndex = 0;
  pageSize = 10;
  cachedData: FilterSectionPart[][] = [];
  get pageCount(): number { return Math.ceil(this.paginatorLength / this.pageSize); }
  sort?: Sort = undefined;

  filterSectionId: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _filterSectionPartService: FilterSectionPartService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.filterSectionParts$ = this.filterSectionParts$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(refreshCache: boolean = false): void {
    this.filterSectionId = this._activatedRoute.snapshot.paramMap.get('filterSectionId') ?? undefined;
    if (!!this.filterSectionId) {
      this._getPagedEntities$(this.pageIndex, this.pageSize, refreshCache, {
        filterSectionId: [this.filterSectionId],
        include: ['filterModelProperty'],
        orderBy: this.sort?.direction === 'asc' ? [this.sort.active] : [],
        orderByDescending: this.sort?.direction === 'desc' ? [this.sort.active] : []
      }).subscribe({
        next: results => this._filterSectionPartsSubject.next(results)
      });
    }
  }

  private _getPagedEntities$(pageIndex: number, pageSize: number, refreshCache: boolean, query?: Partial<FilterSectionPartQuery>): Observable<FilterSectionPart[]> {
    const cachedItems = this.cachedData[pageIndex] ?? [];
    if (!refreshCache && (this.cachedData.length === this.pageCount && cachedItems.length > 0)) {
      return from(cachedItems).pipe(toArray());
    }

    return this._filterSectionPartService.getAllPaged(new PaginationRequest(pageIndex + 1, pageSize), query).pipe(
      tap(response => {
        this.paginatorLength = response?.count ?? this.paginatorLength;
        this.cachedData = !refreshCache && this.cachedData.length === this.pageCount ? this.cachedData : new Array(this.pageCount).fill([]);
        this.cachedData[pageIndex] = response?.data ?? [];
      }),
      map(response => response?.data ?? [])
    );
  }

  editAddItem(model?: FilterSectionPart): void {
    const params = ['edit'];
    this._router.navigate(!!model?.id ? [...params, model.id] : params, { relativeTo: this._activatedRoute });
  }

  viewOptions(model: FilterSectionPart): void {
    this._router.navigate([model.id, 'options'], { relativeTo: this._activatedRoute });
  }

  deleteItems(models?: FilterSectionPart[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Filter Section Part' : 'Filter Section Parts';
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
              this._filterSectionPartService.delete(m.id).subscribe({
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

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, from, map, Observable, skipWhile, Subject, takeUntil, tap, toArray } from 'rxjs';

import { FilterModel, FilterModelQuery, FilterModelService } from '@app/features';
import { PaginationRequest } from '@core/models/pagination';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-filter-models-manage',
  templateUrl: './admin-filter-models-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterModelService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterModelsManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _filterModelsSubject = new BehaviorSubject<FilterModel[]>([]);
  readonly filterModels$ = this._filterModelsSubject.asObservable();
  public readonly columns: AdminColumn[] = [
    { title: 'Type Name', property: 'typeName' }
  ];
  selectedItems: any[] = [];
  paginatorLength = 0;
  pageIndex = 0;
  pageSize = 10;
  cachedData: FilterModel[][] = [];
  get pageCount(): number { return Math.ceil(this.paginatorLength / this.pageSize); }

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _filterModelService: FilterModelService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.filterModels$ = this.filterModels$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(refreshCache: boolean = false): void {
    this._getPagedEntities$(this.pageIndex, this.pageSize, refreshCache, {
      orderBy: ['typeName']
    }).subscribe({
      next: results => this._filterModelsSubject.next(results)
    });
  }

  private _getPagedEntities$(pageIndex: number, pageSize: number, refreshCache: boolean, query?: Partial<FilterModelQuery>): Observable<FilterModel[]> {
    const cachedItems = this.cachedData[pageIndex] ?? [];
    if (!refreshCache && (this.cachedData.length === this.pageCount && cachedItems.length > 0)) {
      return from(cachedItems).pipe(toArray());
    }

    return this._filterModelService.getAllPaged(new PaginationRequest(pageIndex + 1, pageSize), query).pipe(
      tap(response => {
        this.paginatorLength = response?.count ?? this.paginatorLength;
        this.cachedData = !refreshCache && this.cachedData.length === this.pageCount ? this.cachedData : new Array(this.pageCount).fill([]);
        this.cachedData[pageIndex] = response?.data ?? [];
      }),
      map(response => response?.data ?? [])
    );
  }

  editAddItem(model?: FilterModel): void {
    const params = ['edit'];
    this._router.navigate(!!model?.id ? [...params, model.id] : params, { relativeTo: this._activatedRoute });
  }

  viewProperties(model: FilterModel): void {
    this._router.navigate([model.id, 'properties'], { relativeTo: this._activatedRoute });
  }

  deleteItems(models?: FilterModel[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Filter Model' : 'Filter Models';
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
              this._filterModelService.delete(m.id).subscribe({
                next: () => this.getEntities(true),
                error: (error: any) => console.error('Error:', error)
              });
            }
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

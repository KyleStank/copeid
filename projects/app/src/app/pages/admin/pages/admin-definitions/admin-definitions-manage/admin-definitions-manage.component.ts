import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, from, map, Observable, skipWhile, Subject, takeUntil, tap, toArray } from 'rxjs';

import { Definition, DefinitionQuery, DefinitionService } from '@app/features';
import { PaginationRequest } from '@core/models/pagination';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-definitions-manage',
  templateUrl: './admin-definitions-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [DefinitionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDefinitionsManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _definitionsSubject = new BehaviorSubject<Definition[]>([]);
  readonly definitions$ = this._definitionsSubject.asObservable();
  readonly columns: AdminColumn[] = [
    { title: 'Name', property: 'name' },
    { title: 'Meaning', property: 'meaning' }
  ];
  selectedItems: any[] = [];
  paginatorLength = 0;
  pageIndex = 0;
  pageSize = 10;
  cachedData: Definition[][] = [];
  get pageCount(): number { return Math.ceil(this.paginatorLength / this.pageSize); }

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _definitionService: DefinitionService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.definitions$ = this.definitions$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(refreshCache: boolean = false): void {
    this._getPagedEntities$(this.pageIndex, this.pageSize, refreshCache, {
      orderBy: ['name']
    }).subscribe({
      next: results => this._definitionsSubject.next(results)
    });
  }

  private _getPagedEntities$(pageIndex: number, pageSize: number, refreshCache: boolean, query?: Partial<DefinitionQuery>): Observable<Definition[]> {
    const cachedItems = this.cachedData[pageIndex] ?? [];
    if (!refreshCache && (this.cachedData.length === this.pageCount && cachedItems.length > 0)) {
      return from(cachedItems).pipe(toArray());
    }

    return this._definitionService.getAllPaged(new PaginationRequest(pageIndex + 1, pageSize), query).pipe(
      tap(response => {
        this.paginatorLength = response?.count ?? this.paginatorLength;
        this.cachedData = !refreshCache && this.cachedData.length === this.pageCount ? this.cachedData : new Array(this.pageCount).fill([]);
        this.cachedData[pageIndex] = response?.data ?? [];
      }),
      map(response => response?.data ?? [])
    );
  }

  editAddItem(model?: Definition): void {
    if (!!model?.id) {
      this._router.navigate(['edit', model.id], { relativeTo: this._activatedRoute });
    } else {
      this._router.navigate(['create'], { relativeTo: this._activatedRoute });
    }
  }

  deleteItems(models?: Definition[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Definition' : 'Definitions';
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
              this._definitionService.delete(m.id).subscribe({
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

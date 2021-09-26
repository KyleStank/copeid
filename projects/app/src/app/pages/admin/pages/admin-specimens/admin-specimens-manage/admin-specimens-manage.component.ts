import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, from, map, Observable, skipWhile, Subject, takeUntil, tap, toArray } from 'rxjs';

import { DocumentService, Specimen, SpecimenQuery, SpecimenService } from '@app/features';
import { PaginationRequest } from '@core/models/pagination';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-specimens-manage',
  templateUrl: './admin-specimens-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [DocumentService, SpecimenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSpecimensManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _specimensSubject = new BehaviorSubject<Specimen[]>([]);
  readonly specimens$ = this._specimensSubject.asObservable();
  public readonly columns: AdminColumn[] = [
    { title: 'Genus Name', property: 'genus.name' },
    { title: 'Photograph Title', property: 'photograph.title' }
  ];
  selectedItems: any[] = [];
  paginatorLength = 0;
  pageIndex = 0;
  pageSize = 10;
  cachedData: Specimen[][] = [];
  get pageCount(): number { return Math.ceil(this.paginatorLength / this.pageSize); }
  sortDirection: 'asc' | 'desc' | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _documentService: DocumentService,
    private readonly _dialog: MatDialog,
    private readonly _specimenService: SpecimenService,
    private readonly _router: Router
  ) {
    this.specimens$ = this.specimens$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(refreshCache: boolean = false): void {
    this._getPagedEntities$(this.pageIndex, this.pageSize, refreshCache, {
      include: ['genus', 'photograph'],
      orderBy: this.sortDirection === 'asc' ? ['genus.name'] : [],
      orderByDescending: this.sortDirection === 'desc' ? ['genus.name'] : []
    }).subscribe({
      next: results => this._specimensSubject.next(results)
    });
  }

  private _getPagedEntities$(pageIndex: number, pageSize: number, refreshCache: boolean, query?: Partial<SpecimenQuery>): Observable<Specimen[]> {
    const cachedItems = this.cachedData[pageIndex] ?? [];
    if (!refreshCache && (this.cachedData.length === this.pageCount && cachedItems.length > 0)) {
      return from(cachedItems).pipe(toArray());
    }

    return this._specimenService.getAllPaged(new PaginationRequest(pageIndex + 1, pageSize), query).pipe(
      tap(response => {
        this.paginatorLength = response?.count ?? this.paginatorLength;
        this.cachedData = !refreshCache && this.cachedData.length === this.pageCount ? this.cachedData : new Array(this.pageCount).fill([]);
        this.cachedData[pageIndex] = response?.data ?? [];
      }),
      map(response => response?.data ?? [])
    );
  }

  editAddItem(model?: Specimen): void {
    if (!!model?.id) {
      this._router.navigate(['edit', model.id], { relativeTo: this._activatedRoute });
    } else {
      this._router.navigate(['create'], { relativeTo: this._activatedRoute });
    }
  }

  previewPhotograph(model?: Specimen): void {
    if (!!model?.photograph?.documentId) {
      this._documentService.getDocumentUri(model.photograph.documentId).subscribe({
        next: uri => window.open(uri, '_blank')?.focus()
      });
    }
  }

  deleteItems(models?: Specimen[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Specimen' : 'Specimens';
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
              this._specimenService.delete(m.id).subscribe({
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

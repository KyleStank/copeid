import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, skipWhile, Subject, takeUntil } from 'rxjs';

import { FilterSectionPartOption, FilterSectionPartOptionService } from '@app/features';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-filters-sections-parts-options-manage',
  templateUrl: './admin-filter-sections-parts-options-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterSectionPartOptionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersSectionsPartsOptionsManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _filterSectionPartOptionsSubject = new BehaviorSubject<FilterSectionPartOption[]>([]);
  readonly filterSectionPartOptions$ = this._filterSectionPartOptionsSubject.asObservable();

  public readonly columns: AdminColumn[] = [
    { title: 'Display Name', property: 'displayName' },
    { title: 'Code', property: 'code' },
    { title: 'Value', property: 'value' }
  ];
  selectedItems: any[] = [];

  filterSectionPartId: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _filterSectionPartOptionService: FilterSectionPartOptionService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.filterSectionPartOptions$ = this.filterSectionPartOptions$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this.filterSectionPartId = this._activatedRoute.snapshot.paramMap.get('filterSectionPartId') ?? undefined;
    if (!!this.filterSectionPartId) {
      this._filterSectionPartOptionService.getAll({
        filterSectionPartId: [this.filterSectionPartId],
        orderBy: ['displayName']
      }).subscribe(this._filterSectionPartOptionsSubject.next.bind(this._filterSectionPartOptionsSubject));
    }
  }

  editAddItem(model?: FilterSectionPartOption): void {
    const params = ['edit'];
    this._router.navigate(!!model?.id ? [...params, model.id] : params, { relativeTo: this._activatedRoute });
  }

  deleteItems(models?: FilterSectionPartOption[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Filter Section Part Option' : 'Filter Section Part Options';
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
              this._filterSectionPartOptionService.delete(m.id).subscribe({
                next: () => this.getEntities(),
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

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, skipWhile, Subject, takeUntil } from 'rxjs';

import { FilterSectionOption, FilterSectionOptionService, FilterSectionService } from '@app/features';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-filters-sections-options-manage',
  templateUrl: './admin-filter-sections-options-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterSectionService, FilterSectionOptionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersSectionsOptionsManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _filterSectionOptionsSubject = new BehaviorSubject<FilterSectionOption[]>([]);
  readonly filterSectionOptions$ = this._filterSectionOptionsSubject.asObservable();

  private readonly _propertyTypesSubject = new BehaviorSubject<string[]>([]);
  readonly propertyTypes$ = this._propertyTypesSubject.asObservable();

  public readonly columns: AdminColumn[] = [
    { title: 'Display Name', property: 'displayName' },
    { title: 'Value', property: 'value' }
  ];
  selectedItems: any[] = [];

  filterSectionId: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _filterSectionService: FilterSectionService,
    private readonly _filterSectionOptionService: FilterSectionOptionService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.filterSectionOptions$ = this.filterSectionOptions$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this.filterSectionId = this._activatedRoute.snapshot.paramMap.get('filterSectionId') ?? undefined;
    if (!!this.filterSectionId) {
      this._filterSectionService.getOptions(this.filterSectionId).subscribe(this._filterSectionOptionsSubject.next.bind(this._filterSectionOptionsSubject));
    }
  }

  editAddItem(model?: FilterSectionOption): void {
    const params = ['edit'];
    this._router.navigate(!!model?.id ? [...params, model.id] : params, { relativeTo: this._activatedRoute });
  }

  viewOptions(model: FilterSectionOption): void {
    this._router.navigate([model.id, 'options'], { relativeTo: this._activatedRoute });
  }

  deleteItems(models?: FilterSectionOption[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Filter Section Option' : 'Filter Section Options';
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
              this._filterSectionOptionService.delete(m.id).subscribe({
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
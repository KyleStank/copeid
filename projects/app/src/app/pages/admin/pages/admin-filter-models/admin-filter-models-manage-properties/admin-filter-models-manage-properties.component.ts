import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, skipWhile, Subject, takeUntil } from 'rxjs';

import { FilterModelProperty, FilterModelPropertyService, FilterModelService } from '@app/features';
import { IAdminManageView } from '../../../components';
import { AdminColumn } from '../../../common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';

@Component({
  selector: 'app-admin-filter-models-manage-properties',
  templateUrl :'./admin-filter-models-manage-properties.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterModelService, FilterModelPropertyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterModelsManagePropertiesComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _filterModelPropertiesSubject = new BehaviorSubject<FilterModelProperty[]>([]);
  readonly filterModelProperties$ = this._filterModelPropertiesSubject.asObservable();

  private readonly _propertyTypesSubject = new BehaviorSubject<string[]>([]);
  readonly propertyTypes$ = this._propertyTypesSubject.asObservable();

  public readonly columns: AdminColumn[] = [
    { title: 'Property Name', property: 'propertyName' }
  ];
  selectedItems: any[] = [];

  filterModelId: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _filterModelService: FilterModelService,
    private readonly _filterModelPropertySerivce: FilterModelPropertyService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.filterModelProperties$ = this.filterModelProperties$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this.filterModelId = this._activatedRoute.snapshot.paramMap.get('filterModelId') ?? undefined;
    if (!!this.filterModelId) {
      this._filterModelService.getProperties(this.filterModelId).subscribe(this._filterModelPropertiesSubject.next.bind(this._filterModelPropertiesSubject));
      this._filterModelService.getPropertyTypes(this.filterModelId).subscribe(this._propertyTypesSubject.next.bind(this._propertyTypesSubject));
    }
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

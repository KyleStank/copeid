import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { FilterModelProperty, FilterModelPropertyService, FilterModelService } from '@app/features';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../../common';
import { AdminFilterModelPropertiesEditModalComponent } from '../../../../modals';

@Component({
  selector: 'app-admin-filter-model-properties',
  templateUrl: './admin-filter-model-properties.component.html',
  styleUrls: ['./admin-filter-model-properties.component.scss'],
  host: {
    'class': 'd-block'
  },
  providers: [
    FilterModelService,
    FilterModelPropertyService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterModelPropertiesPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _filterModelPropertiesSubject = new BehaviorSubject<FilterModelProperty[]>([]);
  readonly filterModelProperties$ = this._filterModelPropertiesSubject.asObservable();
  readonly columns: AdminColumn[] = [
    { title: 'Property', property: 'propertyName' }
  ];

  id: string | undefined;
  propertyTypes: string[] = [];
  selectedItems: FilterModelProperty[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _filterModelService: FilterModelService,
    private readonly _filterModelPropertyService: FilterModelPropertyService
  ) {
    this.filterModelProperties$ = this.filterModelProperties$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id') ?? undefined;
    if (!!this.id) {
      this.getFilterModelProperties(this.id);
    }
  }

  toggleEntity(selected: FilterModelProperty[]): void {
    this.selectedItems = selected;
  }

  getFilterModelProperties(id: string): void {
    // Gets all possible types for model ID.
    this._filterModelService.getPropertyTypes(id).subscribe({
      next: propertyTypes => this.propertyTypes = propertyTypes
    });

    // Gets actual filter model properties.
    this._filterModelService.getProperties(id).subscribe({
      next: properties => this._filterModelPropertiesSubject.next(properties)
    });
  }

  openEditModal(model?: FilterModelProperty): void {
    model = {
      ...(model ?? {}),
      filterModelId: this.id,
    } as FilterModelProperty;

    const dialogRef = this._dialog.open(AdminFilterModelPropertiesEditModalComponent, {
      data: {
        properties: this.propertyTypes,
        model
      },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe({
      next: (filterModelProperty: FilterModelProperty) => {
        if (!filterModelProperty?.propertyName) return;

        if (!!filterModelProperty.id) {
          this._filterModelPropertyService.update(filterModelProperty).subscribe({
            next: () => this.getFilterModelProperties(this.id!)
          });
        } else {
          this._filterModelPropertyService.create(filterModelProperty).subscribe({
            next: () => this.getFilterModelProperties(this.id!)
          });
        }
      }
    });
  }

  openDeleteModal(models?: FilterModelProperty[]): void {
    models = models ?? this.selectedItems;

    const dialogRef = this._dialog.open(ConfirmationAlertModalCompoonent, {
      data: {
        title: `Delete Filter ${models.length === 1 ? 'Model' : 'Models'}`,
        message: `Are you sure you want to delete ${models.length === 1 ? 'this Filter Model' : 'these Filter Models'}?`
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          models!.forEach(model => {
            if (!!model?.id) {
              this._filterModelPropertyService.delete(model.id).subscribe({
                next: () => this.getFilterModelProperties(this.id!)
              });
            }
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

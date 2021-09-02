import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { FilterModelProperty, FilterModelPropertyService, FilterModelService } from '@app/features';
import { AdminColumn } from '../../../../common';

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

  propertyTypes: string[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _filterModelService: FilterModelService,
    private readonly _filterModelPropertyService: FilterModelPropertyService
  ) {
    this.filterModelProperties$ = this.filterModelProperties$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (!!id) {
      this.getFilterModelProperties(id);
    }
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

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  openEditModal(model?: FilterModelProperty): void {
    console.log('Edit:', model);
  }

  openDeleteModal(model?: FilterModelProperty): void {
    console.log('Delete:', model);
  }
}

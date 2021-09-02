import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { Filter, FilterModel, FilterModelService, FilterService } from '@app/features';
import { AdminColumn } from '../../common';
import { AdminFilterModelEditModalComponent } from '../../modals';

@Component({
  selector: 'app-admin-filter',
  templateUrl: './admin-filter.component.html',
  styleUrls: ['./admin-filter.component.scss'],
  providers: [
    FilterModelService,
    FilterService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFilterPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _filterModelsSubject = new BehaviorSubject<FilterModel[]>([]);
  readonly filterModels$ = this._filterModelsSubject.asObservable();
  readonly filterModelColumns: AdminColumn[] = [
    { title: 'Type', property: 'typeName' }
  ];

  private readonly _filtersSubject = new BehaviorSubject<Filter[]>([]);
  readonly filters$ = this._filtersSubject.asObservable();

  types: string[] = [];

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _filterModelService: FilterModelService,
    private readonly _filterService: FilterService
  ) {
    this.filterModels$ = this.filterModels$.pipe(takeUntil(this._destroyed));
    this.filters$ = this.filters$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this._filterModelService.getAll().subscribe({
      next: filterModels => {
        this._filterModelsSubject.next(
          filterModels.sort((a, b) =>
            a.typeName! > b.typeName! ? 1 : -1
          )
        );
      }
    });
    this._filterModelService.getTypes().subscribe({
      next: types => this.types = types
    });

    this._filterService.getAll().subscribe(this._filtersSubject.next.bind(this._filtersSubject));
  }

  toggleEntity(e: any): void {
    console.log('Toggle:', e);
  }

  editEntity(e: any): void {
    console.log('Edit:', e);
  }

  deleteEntity(e: any): void {
    console.log('Delete:', e);
  }

  openFilterModelEditModal(model?: FilterModel): void {
    const dialogRef = this._dialog.open(AdminFilterModelEditModalComponent, {
      data: {
        types: this.types,
        model
      },
      width: '400px'
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._destroyed))
      .subscribe({
        next: (filterModel: FilterModel) => {
          if (!filterModel?.typeName) return;

          if (!filterModel?.id) {
            this._filterModelService.create(filterModel).subscribe({
              next: result => {
                const filterModels = [...this._filterModelsSubject.value, result];
                this._filterModelsSubject.next(
                  filterModels.sort((a, b) => a.typeName! > b.typeName! ? 1 : -1)
                );
              }
            })
          }
        }
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

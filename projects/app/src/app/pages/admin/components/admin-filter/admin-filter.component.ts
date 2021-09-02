import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { FilterModel, FilterModelService, FilterService } from '@app/features';

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

  types: string[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _filterModelService: FilterModelService,
    private readonly _filterService: FilterService,
    private readonly _router: Router
  ) {
    this.filterModels$ = this.filterModels$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this.getFilterModels();
  }

  getFilterModels(): void {
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
  }

  saveFilterModel(model: FilterModel): void {
    if (!!model.id) {
      this._filterModelService.update(model).subscribe({
        next: () => this.getFilterModels()
      });
    } else {
      this._filterModelService.create(model).subscribe({
        next: () => this.getFilterModels()
      });
    }
  }

  navigateToFilterModelProperties(model: FilterModel): void {
    this._router.navigate(['models', model.id, 'properties'], { relativeTo: this._activatedRoute });
  }

  deleteFilterModels(models: FilterModel[]): void {
    models.forEach(model => {
      if (!!model?.id) {
        this._filterModelService.delete(model.id).subscribe({
          next: () => this.getFilterModels()
        });
      }
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

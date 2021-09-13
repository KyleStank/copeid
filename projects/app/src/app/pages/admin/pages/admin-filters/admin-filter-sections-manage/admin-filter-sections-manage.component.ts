import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { FilterSection, FilterSectionService, FilterService } from '@app/features';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { BehaviorSubject, map, skipWhile, Subject, takeUntil } from 'rxjs';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-filters-sections-manage',
  templateUrl: './admin-filter-sections-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [FilterService, FilterSectionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminFiltersSectionsManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _filterSectionsSubject = new BehaviorSubject<FilterSection[]>([]);
  readonly filterSections$ = this._filterSectionsSubject.asObservable();

  public readonly columns: AdminColumn[] = [
    { title: 'Display Name', property: 'displayName' },
    { title: 'Code', property: 'code' }
  ];
  selectedItems: any[] = [];

  filterId: string | undefined;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _filterService: FilterService,
    private readonly _filterSectionService: FilterSectionService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.filterSections$ = this.filterSections$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this.filterId = this._activatedRoute.snapshot.paramMap.get('filterId') ?? undefined;
    if (!!this.filterId) {
      this._filterService.getSections(this.filterId).pipe(
        map(results => results.sort((a, b) => a.displayName! > b.displayName! ? 1 : -1))
      ).subscribe(this._filterSectionsSubject.next.bind(this._filterSectionsSubject));
    }
  }

  editAddItem(model?: FilterSection): void {
    const params = ['edit'];
    this._router.navigate(!!model?.id ? [...params, model.id] : params, { relativeTo: this._activatedRoute });
  }

  viewOptions(model: FilterSection): void {
    this._router.navigate([model.id, 'options'], { relativeTo: this._activatedRoute });
  }

  deleteItems(models?: FilterSection[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Filter Section' : 'Filter Sections';
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
              this._filterSectionService.delete(m.id).subscribe({
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

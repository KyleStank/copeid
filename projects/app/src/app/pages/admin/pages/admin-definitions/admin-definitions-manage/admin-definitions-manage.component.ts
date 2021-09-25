import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, skipWhile, Subject, takeUntil, tap } from 'rxjs';

import { Definition, DefinitionService } from '@app/features';
import { PaginationRequest } from '@core/models/pagination';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn, AdminDataTableComponent } from '../../../common';
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

  @ViewChild(AdminDataTableComponent, { static: true })
  adminDataTable!: AdminDataTableComponent;

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

  getEntities(): void {
    this.getPagedEntities(this.adminDataTable.currentPageIndex + 1, this.adminDataTable.currentPageSize);
  }

  getPagedEntities(pageNumber: number, pageSize: number): void {
    this._definitionService.getAllPaged(new PaginationRequest(pageNumber, pageSize), {
      orderBy: ['name']
    }).pipe(
      tap(response => this.paginatorLength = response?.count ?? this.paginatorLength),
      map(response => response?.data ?? [])
    ).subscribe(this._definitionsSubject.next.bind(this._definitionsSubject));
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

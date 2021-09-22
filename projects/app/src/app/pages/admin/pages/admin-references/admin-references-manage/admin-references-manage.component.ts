import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, skipWhile, Subject, takeUntil } from 'rxjs';

import { Reference, ReferenceService } from '@app/features';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-references-manage',
  templateUrl: './admin-references-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [ReferenceService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReferencesManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _referencesSubject = new BehaviorSubject<Reference[]>([]);
  readonly references$ = this._referencesSubject.asObservable();
  public readonly columns: AdminColumn[] = [
    { title: 'Content', property: 'content' }
  ];
  selectedItems: any[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _referenceService: ReferenceService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.references$ = this.references$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this._referenceService.getAll({
      orderBy: ['name']
    }).subscribe(this._referencesSubject.next.bind(this._referencesSubject));
  }

  editAddItem(model?: Reference): void {
    if (!!model?.id) {
      this._router.navigate(['edit', model.id], { relativeTo: this._activatedRoute });
    } else {
      this._router.navigate(['create'], { relativeTo: this._activatedRoute });
    }
  }

  deleteItems(models?: Reference[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Reference' : 'References';
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
              this._referenceService.delete(m.id).subscribe({
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

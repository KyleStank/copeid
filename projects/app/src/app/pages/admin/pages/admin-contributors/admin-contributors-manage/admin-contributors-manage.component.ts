import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, skipWhile, Subject, takeUntil } from 'rxjs';

import { Contributor, ContributorService } from '@app/features';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-contributors',
  templateUrl: './admin-contributors-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [ContributorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContributorsManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _contributorsSubject = new BehaviorSubject<Contributor[]>([]);
  readonly contributors$ = this._contributorsSubject.asObservable();
  public readonly columns: AdminColumn[] = [
    { title: 'Name', property: 'name' }
  ];
  selectedItems: any[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _contributorService: ContributorService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.contributors$ = this.contributors$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this._contributorService.getAll().subscribe(this._contributorsSubject.next.bind(this._contributorsSubject));
  }

  editAddItem(model?: Contributor): void {
    if (!!model?.id) {
      this._router.navigate(['edit', model.id], { relativeTo: this._activatedRoute });
    } else {
      this._router.navigate(['create'], { relativeTo: this._activatedRoute });
    }
  }

  deleteItems(models?: Contributor[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const dialogRef = this._dialog.open(ConfirmationAlertModalCompoonent, {
      data: {
        title: `Delete Contributor`,
        message: `Are you sure you want to delete this Contributor?`
      }
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroyed),
        skipWhile((result: boolean) => !result)
      ).subscribe({
        next: () => {
          models = models ?? [];
          models.forEach(m => {
            if (!!m?.id) {
              this._contributorService.delete(m.id).subscribe({
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

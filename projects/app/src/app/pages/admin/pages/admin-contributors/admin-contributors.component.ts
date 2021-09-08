import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { Contributor, ContributorService } from '@app/features';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../common';

@Component({
  selector: 'app-admin-contributors',
  templateUrl: './admin-contributors.component.html',
  providers: [ContributorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContributorsComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _contributorsSubject = new BehaviorSubject<Contributor[]>([]);
  readonly contributors$ = this._contributorsSubject.asObservable();
  public readonly columns: AdminColumn[] = [
    { title: 'Name', property: 'name' }
  ];

  readonly singularName = 'Contributor';
  readonly pluralName = 'Contributors';

  selectedEntities: Contributor[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _contributorService: ContributorService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.contributors$ = this.contributors$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  getEntities(): void {
    this._contributorService.getAll().subscribe(this._contributorsSubject.next.bind(this._contributorsSubject));
  }

  editAddEntity(model?: Contributor): void {
    if (!!model?.id) {
      this._router.navigate(['edit', model.id], { relativeTo: this._activatedRoute });
    }
  }

  deleteEntities(models: Contributor[]): void {
    const dialogRef = this._dialog.open(ConfirmationAlertModalCompoonent, {
      data: {
        title: `Delete ${this.singularName}`,
        message: `Are you sure you want to delete this ${this.singularName}?`
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._destroyed))
      .subscribe(
        (result: boolean) => {
          if (result) {
            // TODO: Optimize! Running an API in a loop is NEVER, EVER GOOD. This was only done since this isn't a professional product.
            models.forEach(m => this._deleteEntity(m));
          }
        }
      );
  }

  protected _deleteEntity(model: Contributor): void {
    if (!!model?.id) {
      this._contributorService.delete(model.id).subscribe({
        next: () => this.getEntities(),
        error: (error: any) => console.error('Error:', error)
      });
    }
  }

  toggleEntity(models?: Contributor[]): void {
    this.selectedEntities = models?.filter(x => (x as any).selected) ?? [];
  }
}

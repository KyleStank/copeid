import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, skipWhile, Subject, takeUntil } from 'rxjs';

import { Specimen, SpecimenService } from '@app/features';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-specimens-manage',
  templateUrl: './admin-specimens-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [SpecimenService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSpecimensManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _specimensSubject = new BehaviorSubject<Specimen[]>([]);
  readonly specimens$ = this._specimensSubject.asObservable();
  public readonly columns: AdminColumn[] = [
    { title: 'Name', property: 'genus.name' }
  ];
  selectedItems: any[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _specimenService: SpecimenService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.specimens$ = this.specimens$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this._specimenService.getAll({
      orderBy: ['genus.name'],
      include: ['genus', 'photograph']
    }).subscribe(this._specimensSubject.next.bind(this._specimensSubject));
  }

  editAddItem(model?: Specimen): void {
    if (!!model?.id) {
      this._router.navigate(['edit', model.id], { relativeTo: this._activatedRoute });
    } else {
      this._router.navigate(['create'], { relativeTo: this._activatedRoute });
    }
  }

  deleteItems(models?: Specimen[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Specimen' : 'Specimens';
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
              this._specimenService.delete(m.id).subscribe({
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

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, skipWhile, Subject, takeUntil } from 'rxjs';

import { DocumentService, Genus, GenusService } from '@app/features';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-genuses-manage',
  templateUrl: './admin-genuses-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [DocumentService, GenusService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGenusesManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _genusesSubject = new BehaviorSubject<Genus[]>([]);
  readonly genuses$ = this._genusesSubject.asObservable();
  public readonly columns: AdminColumn[] = [
    { title: 'Name', property: 'name' },
    { title: 'Photograph Title', property: 'photograph.title' }
  ];
  selectedItems: any[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _documentService: DocumentService,
    private readonly _genusService: GenusService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.genuses$ = this.genuses$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this._genusService.getAll({
      include: ['photograph'],
      orderBy: ['name']
    }).subscribe(this._genusesSubject.next.bind(this._genusesSubject));
  }

  editAddItem(model?: Genus): void {
    if (!!model?.id) {
      this._router.navigate(['edit', model.id], { relativeTo: this._activatedRoute });
    } else {
      this._router.navigate(['create'], { relativeTo: this._activatedRoute });
    }
  }

  previewPhotograph(model?: Genus): void {
    if (!!model?.photograph?.documentId) {
      this._documentService.getDocumentUri(model.photograph.documentId).subscribe({
        next: uri => window.open(uri, '_blank')?.focus()
      });
    }
  }

  deleteItems(models?: Genus[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Genus' : 'Genuses';
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
              this._genusService.delete(m.id).subscribe({
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

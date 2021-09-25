import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, skipWhile, Subject, takeUntil } from 'rxjs';

import { DocumentService, Photograph, PhotographService } from '@app/features';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-photographs-manage',
  templateUrl: './admin-photographs-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [DocumentService, PhotographService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPhotographsManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _photographsSubject = new BehaviorSubject<Photograph[]>([]);
  readonly photographs$ = this._photographsSubject.asObservable();
  public readonly columns: AdminColumn[] = [
    { title: 'Document Name', property: 'document.name' },
    { title: 'Title', property: 'title' },
    { title: 'Description', property: 'description' }
  ];
  selectedItems: any[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _documentService: DocumentService,
    private readonly _dialog: MatDialog,
    private readonly _photographService: PhotographService,
    private readonly _router: Router
  ) {
    this.photographs$ = this.photographs$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this._photographService.getAll({
      include: ['document'],
      orderBy: ['title']
    }).subscribe(this._photographsSubject.next.bind(this._photographsSubject));
  }

  editAddItem(model?: Photograph): void {
    if (!!model?.id) {
      this._router.navigate(['edit', model.id], { relativeTo: this._activatedRoute });
    } else {
      this._router.navigate(['create'], { relativeTo: this._activatedRoute });
    }
  }

  preview(model?: Photograph): void {
    this._documentService.getDocumentUri(model!.documentId!).subscribe({
      next: uri => window.open(uri, '_blank')?.focus()
    });
  }

  deleteItems(models?: Photograph[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Photograph' : 'Photographs';
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
              this._photographService.delete(m.id).subscribe({
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

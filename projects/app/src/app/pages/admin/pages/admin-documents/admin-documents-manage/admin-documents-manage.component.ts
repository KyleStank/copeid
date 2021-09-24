import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, skipWhile, Subject, takeUntil } from 'rxjs';

import { Document, DocumentService } from '@app/features';
import { ConfirmationAlertModalCompoonent } from '@shared/modals/confirmation-alert';
import { FilePreviewDialogData, FilePreviewModalComponent } from '@shared/modals/file-preview';
import { AdminColumn } from '../../../common';
import { IAdminManageView } from '../../../components';

@Component({
  selector: 'app-admin-documents-manage',
  templateUrl: './admin-documents-manage.component.html',
  host: {
    'class': 'd-block'
  },
  providers: [DocumentService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDocumentsManageComponent implements IAdminManageView, OnInit, OnDestroy {
  readonly destroyed = new Subject<void>();

  private readonly _definitionsSubject = new BehaviorSubject<Document[]>([]);
  readonly definitions$ = this._definitionsSubject.asObservable();
  readonly columns: AdminColumn[] = [
    { title: 'Name', property: 'name' }
  ];
  selectedItems: any[] = [];

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _documentService: DocumentService,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    this.definitions$ = this.definitions$.pipe(takeUntil(this.destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  getEntities(): void {
    this._documentService.getAll({
      orderBy: ['name']
    }).subscribe(this._definitionsSubject.next.bind(this._definitionsSubject));
  }

  editAddItem(model?: Document): void {
    if (!!model?.id) {
      this._router.navigate(['edit', model.id], { relativeTo: this._activatedRoute });
    } else {
      this._router.navigate(['create'], { relativeTo: this._activatedRoute });
    }
  }

  preview(model?: Document): void {
    this._documentService.getDocumentUri(model!.id!).subscribe({
      next: uri => {
        this._dialog.open<FilePreviewModalComponent, FilePreviewDialogData, void>(FilePreviewModalComponent, {
          data: {
            title: 'Preview Document',
            uri
          },
          width: '650px'
        });
      }
    });
  }

  deleteItems(models?: Document[]): void {
    models = models ?? [];
    if (models.length === 0) return;

    const isSingle = models.length === 1;
    const modelName = isSingle ? 'Document' : 'Documents';
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
              this._documentService.delete(m.id).subscribe({
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

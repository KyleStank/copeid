import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';

import { IAdminManageContainer, IAdminManageView } from './admin-manage.model';

@Component({
  selector: 'app-admin-manage-container',
  templateUrl: './admin-manage-container.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminManageContainerComponent implements IAdminManageContainer, OnDestroy {
  readonly destroyed = new Subject<void>();

  @ViewChild(RouterOutlet, { static: true })
  routerOutlet?: RouterOutlet;

  activeView: IAdminManageView | undefined;

  constructor(readonly dialog: MatDialog) {}

  activateView(viewComponent?: IAdminManageView): void {
    this.activeView = viewComponent ?? this.activeView ?? undefined;
  }

  deactivateView(viewComponent?: IAdminManageView): void {
    this.activeView = undefined;
  }

  editAddItem(model?: any): void {
    if (!!this.activeView) {
      this.activeView.editAddItem(model);
    }
  }

  deleteSelectedItems(): void {
    if (!!this.activeView) {
      this.activeView.deleteItems(this.activeView.selectedItems);
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

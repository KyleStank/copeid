import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { IAdminView } from '../../models';
import { IAdminEditView } from './admin-edit-view.model';

@Component({
  selector: 'app-admin-edit-container',
  templateUrl: './admin-edit-container.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEditContainerComponent implements IAdminView, OnDestroy {
  readonly destroyed = new Subject<void>();
  private readonly _routeDeactivated = new Subject<void>();

  @ViewChild(RouterOutlet, { static: true })
  routerOutlet?: RouterOutlet;

  private _activeViewComponent?: IAdminEditView;

  pageTitle?: string;

  constructor(
    readonly activatedRoute: ActivatedRoute,
    readonly changeDetectorRef: ChangeDetectorRef,
    readonly router: Router
  ) {}

  activateView(viewComponent: IAdminEditView): void {
    this._activeViewComponent = viewComponent ?? this._activeViewComponent;
    if (!!this._activeViewComponent) {
      this._activeViewComponent!.model$
        .pipe(takeUntil(this._routeDeactivated))
        .subscribe({
          next: () => this.pageTitle = this._activeViewComponent!.updateModelTitle()
        });
    }
  }

  deactivateView(viewComponent: IAdminEditView): void {
    this._routeDeactivated.next();
    this._activeViewComponent = undefined;
  }

  save(): void {
    if (!!this._activeViewComponent) {
      this._activeViewComponent.save()
        .pipe(takeUntil(this.destroyed))
        .subscribe({
          next: () => this.back(),
          error: err => console.error('Error:', err)
        });
    }
  }

  back(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    this._routeDeactivated.next();
    this._routeDeactivated.complete();

    this.destroyed.next();
    this.destroyed.complete();
  }
}

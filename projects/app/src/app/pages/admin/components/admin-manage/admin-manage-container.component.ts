import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';

import { IAdminManageViewComponent } from './admin-manage-view.abstract.component';

@Component({
  selector: 'app-admin-manage-container',
  templateUrl: './admin-manage-container.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminManageContainerComponent implements OnDestroy {
  private readonly _destroyed = new Subject<void>();
  private readonly _routeDeactivated = new Subject<void>();

  @ViewChild(RouterOutlet, { static: true })
  routerOutlet?: RouterOutlet;

  private _activeViewComponent?: IAdminManageViewComponent;

  pageTitle?: string;

  constructor(
    readonly activatedRoute: ActivatedRoute,
    readonly changeDetectorRef: ChangeDetectorRef,
    readonly router: Router
  ) {}

  routeActivated(viewComponent: IAdminManageViewComponent): void {
    this._activeViewComponent = viewComponent ?? this._activeViewComponent;
    if (!!this._activeViewComponent) {
      this._activeViewComponent!.model$
        .pipe(takeUntil(this._routeDeactivated))
        .subscribe({
          next: () => this.pageTitle = this._activeViewComponent!.updateModelTitle()
        });
    }
  }

  routeDeactivated(viewComponent: IAdminManageViewComponent): void {
    this._routeDeactivated.next();
    this._activeViewComponent = undefined;
  }

  save(): void {
    if (!!this._activeViewComponent) {
      this._activeViewComponent.save()
        .pipe(takeUntil(this._destroyed))
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

    this._destroyed.next();
    this._destroyed.complete();
  }
}

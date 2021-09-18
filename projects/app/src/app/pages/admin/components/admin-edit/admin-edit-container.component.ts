import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { IAdminEditContainer, IAdminEditView } from './admin-edit-view.model';

@Component({
  selector: 'app-admin-edit-container',
  templateUrl: './admin-edit-container.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEditContainerComponent implements IAdminEditContainer, OnDestroy {
  readonly destroyed = new Subject<void>();

  activeView: IAdminEditView | undefined;

  constructor(
    readonly activatedRoute: ActivatedRoute,
    readonly changeDetectorRef: ChangeDetectorRef,
    readonly router: Router
  ) {}

  activateView(viewComponent?: IAdminEditView): void {
    this.activeView = viewComponent ?? this.activeView;
  }

  deactivateView(viewComponent?: IAdminEditView): void {
    this.activeView = undefined;
  }

  save(): void {
    if (!!this.activeView && this.activeView?.valid) {
      this.activeView.save()
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
    this.destroyed.next();
    this.destroyed.complete();
  }
}

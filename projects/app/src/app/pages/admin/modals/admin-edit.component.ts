import { CdkPortalOutlet, CdkPortalOutletAttachedRef, ComponentPortal, ComponentType, Portal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Inject,
  InjectionToken,
  Injector,
  OnDestroy,
  Optional,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Contributor } from '@app/features';

@Component({
  selector: 'app-admin-test',
  template: `
    <mat-form-field class="w-100" appearance="fill">
      <mat-label>Name</mat-label>

      <input
        #nameInput
        matInput
        required
        type="text"
        aria-label="Contributor name text input."
      />

      <mat-error>
        Field is required.
      </mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminTestComponent {
  // constructor(@Inject(ADMIN_FORM_MODEL) public model?: any) {}
}

const ADMIN_FORM_MODEL = new InjectionToken<any>('ADMIN_FORM_MODEL');

export interface AdminEditDialogData {
  title: string;
  model: Contributor;
  contentComponent: any;
}

@Component({
  selector: 'app-admin-edit-title',
  template: `<h2>Mat Dialog Title</h2>`
})
export class AdminEditModalTitleComponent {}

@Component({
  selector: 'app-admin-edit-actions',
  template: `
    <button mat-raised-button color="warn" [mat-dialog-close]="null">Cancel</button>
    <button mat-raised-button color="primary" [mat-dialog-close]="null">Save</button>
  `
})
export class AdminEditModalActionsComponent {}

@Component({
  selector: 'app-admin-edit',
  template: `
    <!-- <h2 class="my-0" mat-dialog-title>{{ data?.title }}</h2> -->
    <div mat-dialog-title>
      <ng-template #titlePortal cdkPortalOutlet></ng-template>
    </div>
    <div class="py-2" mat-dialog-content>
      <ng-template #contentPortal cdkPortalOutlet></ng-template>
    </div>
    <div mat-dialog-actions>
      <ng-template #actionsPortal cdkPortalOutlet></ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEditModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('titlePortal', { static: false, read: CdkPortalOutlet })
  titlePortalOutlet: CdkPortalOutlet | undefined;
  titlePortal: Portal<any> | undefined;
  titleRef: CdkPortalOutletAttachedRef | undefined;

  @ViewChild('contentPortal', { static: false, read: CdkPortalOutlet })
  contentPortalOutlet: CdkPortalOutlet | undefined;
  contentPortal: Portal<any> | undefined;
  contentRef: CdkPortalOutletAttachedRef | undefined;

  @ViewChild('actionsPortal', { static: false, read: CdkPortalOutlet })
  actionsPortalOutlet: CdkPortalOutlet | undefined;
  actionsPortal: Portal<any> | undefined;
  actionsRef: CdkPortalOutletAttachedRef | undefined;

  constructor(
    public readonly injector: Injector,
    public readonly dialogRef: MatDialogRef<any>,
    public readonly viewContainerRef: ViewContainerRef,
    public readonly detectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) @Optional() public readonly data?: AdminEditDialogData
  ) {}

  ngAfterViewInit(): void {
    // TODO: Create title portal.
    if (this.titlePortalOutlet) {
      this.titlePortal = new ComponentPortal(AdminEditModalTitleComponent, null, this.injector);
      this.titleRef = this.titlePortalOutlet.attach(this.titlePortal);
    }

    // TODO: Create content portal.
    if (this.contentPortalOutlet) {
      this.contentPortal = new ComponentPortal(AdminTestComponent, null, this.injector);
      this.contentRef = this.contentPortalOutlet.attach(this.contentPortal);
    }

    // TODO: Create actions portal.
    if (this.actionsPortalOutlet) {
      this.actionsPortal = new ComponentPortal(AdminEditModalActionsComponent, null, this.injector);
      this.actionsRef = this.actionsPortalOutlet.attach(this.actionsPortal);
    }
  }

  ngOnDestroy(): void {
    if (this.titlePortalOutlet) {
      this.titlePortalOutlet.detach();
      this.titlePortalOutlet.dispose();
    }

    if (this.contentPortalOutlet) {
      this.contentPortalOutlet.detach();
      this.contentPortalOutlet.dispose();
    }

    if (this.actionsPortalOutlet) {
      this.actionsPortalOutlet.detach();
      this.actionsPortalOutlet.dispose();
    }
  }
}

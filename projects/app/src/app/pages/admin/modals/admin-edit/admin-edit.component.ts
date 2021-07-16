import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Inject,
  Injector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Contributor } from '@app/features';

export interface AdminEditDialogData {
  title: string;
  model: Contributor;
}

@Component({
  selector: 'app-admin-test',
  template: `
    <mat-form-field class="w-100" appearance="fill" *ngIf="model">
      <mat-label>Name</mat-label>

      <input
        #nameInput
        matInput
        required
        type="text"
        aria-label="Contributor name text input."
        [(ngModel)]="model.name"
      />

      <mat-error>
        Field is required.
      </mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminTestComponent {
  constructor(@Inject('model') public model?: any) {}
}

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEditModalComponent implements AfterViewInit {
  @ViewChild(CdkPortalOutlet, { static: false })
  portalOutlet: CdkPortalOutlet | undefined;

  model: Contributor;
  componentPortal: ComponentPortal<AdminTestComponent> | undefined;
  componentRef: ComponentRef<AdminTestComponent> | undefined;

  constructor(
    public readonly injector: Injector,
    public readonly dialogRef: MatDialogRef<AdminEditModalComponent>,
    public readonly viewContainerRef: ViewContainerRef,
    public readonly detectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public readonly data: AdminEditDialogData
  ) {
    this.model = {
      ...(data?.model || {}),
      name: data?.model?.name || ''
    };
  }

  ngAfterViewInit(): void {
    if (this.portalOutlet) {
      this.componentPortal = new ComponentPortal(
        AdminTestComponent,
        null,
        Injector.create({
          parent: this.injector,
          providers: [{ provide: 'model', useValue: this.model }]
        })
      );

      this.componentRef = this.portalOutlet.attachComponentPortal(this.componentPortal);

      this.detectorRef.detectChanges();
    }
  }
}

import { CdkPortalOutlet, ComponentPortal, ComponentType } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Inject,
  InjectionToken,
  Injector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Contributor } from '@app/features';

// @Component({
//   selector: 'app-admin-test',
//   template: `
//     <mat-form-field class="w-100" appearance="fill" *ngIf="model">
//       <mat-label>Name</mat-label>

//       <input
//         #nameInput
//         matInput
//         required
//         type="text"
//         aria-label="Contributor name text input."
//         [(ngModel)]="model.name"
//       />

//       <mat-error>
//         Field is required.
//       </mat-error>
//     </mat-form-field>
//   `,
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class AdminTestComponent {
//   constructor(@Inject(ADMIN_FORM_MODEL) public model?: any) {}
// }

const ADMIN_FORM_MODEL = new InjectionToken<any>('ADMIN_FORM_MODEL');

export interface AdminEditDialogData {
  title: string;
  model: Contributor;
  contentComponent?: any;
}

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEditModalComponent<TComponent> implements AfterViewInit {
  @ViewChild(CdkPortalOutlet, { static: false })
  portalOutlet: CdkPortalOutlet | undefined;

  model: Contributor;
  componentPortal: ComponentPortal<TComponent> | undefined;
  componentRef: ComponentRef<TComponent> | undefined;

  constructor(
    public readonly injector: Injector,
    public readonly dialogRef: MatDialogRef<TComponent>,
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
        this.data.contentComponent,
        null,
        Injector.create({
          parent: this.injector,
          providers: [{ provide: ADMIN_FORM_MODEL, useValue: this.model }]
        })
      );

      if (this.componentPortal.component) {
        this.componentRef = this.portalOutlet.attachComponentPortal(this.componentPortal);
        this.detectorRef.detectChanges();
      } else {
        console.warn('No component provided');
      }
    }
  }
}

import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { LayoutDirectivesModule } from '@core/layouts/directives';
import { SharedPageHeaderModule } from '@shared/components/page-header';
import { TemplateAdminComponent } from './template-admin/template-admin.component';
import { TemplateDefaultComponent } from './template-default/template-default.component';

const exportedDeclarations: any[] = [
  TemplateAdminComponent,
  TemplateDefaultComponent
];

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    LayoutDirectivesModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    SharedPageHeaderModule
  ],
  declarations: exportedDeclarations,
  exports: [...exportedDeclarations, LayoutDirectivesModule]
})
export class LayoutTemplatesModule {}

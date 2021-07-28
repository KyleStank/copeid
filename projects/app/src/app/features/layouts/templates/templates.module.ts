import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { LayoutDirectivesModule } from '../directives';
import { LayoutFootersModule } from '../footers';
import { LayoutHeadersModule } from '../headers';
import { TemplateAdminComponent, TemplateDefaultComponent } from './components';

const exportedDeclarations: any[] = [
  TemplateAdminComponent,
  TemplateDefaultComponent
];

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    LayoutDirectivesModule,
    LayoutHeadersModule,
    LayoutFootersModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule
  ],
  declarations: exportedDeclarations,
  exports: [...exportedDeclarations, LayoutDirectivesModule]
})
export class LayoutTemplatesModule {}

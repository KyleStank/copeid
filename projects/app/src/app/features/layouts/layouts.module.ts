import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LayoutDefaultComponent } from './components';

const exportedDeclarations: any[] = [
  LayoutDefaultComponent
];

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class LayoutsModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LayoutDirectivesModule } from '../directives';
import { HeaderDefaultComponent } from './components';

const exportedDeclarations: any[] = [
  HeaderDefaultComponent
];

@NgModule({
  imports: [CommonModule, LayoutDirectivesModule, MatButtonModule, MatIconModule, MatToolbarModule],
  declarations: exportedDeclarations,
  exports: [...exportedDeclarations, LayoutDirectivesModule]
})
export class LayoutHeadersModule {}

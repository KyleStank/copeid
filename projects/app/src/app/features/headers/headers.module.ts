import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderDefaultComponent } from './components';
import { FooterHostDirective, HeaderHostDirective, LayoutHostDirective } from './directives';

const exportedDeclarations: any[] = [
  // Components
  HeaderDefaultComponent,

  // Directives
  FooterHostDirective,
  HeaderHostDirective,
  LayoutHostDirective
];

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class HeadersModule {}

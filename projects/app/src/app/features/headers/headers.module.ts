import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderDefaultComponent } from './header-default/header-default.component';

const exportedDeclarations: any[] = [
  HeaderDefaultComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class HeadersModule {}

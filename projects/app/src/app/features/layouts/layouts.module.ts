import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutDefaultComponent } from './components';

const exportedDeclarations: any[] = [
  LayoutDefaultComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class LayoutsModule {}

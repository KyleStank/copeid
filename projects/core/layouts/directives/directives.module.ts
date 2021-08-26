import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutHostDirective } from './layout-host.directive';

const exportedDeclarations: any[] = [
  LayoutHostDirective
];

@NgModule({
  imports: [CommonModule],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class LayoutDirectivesModule {}

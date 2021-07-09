import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateDefaultComponent } from './components';

const exportedDeclarations: any[] = [
  TemplateDefaultComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class LayoutTemplatesModule {}

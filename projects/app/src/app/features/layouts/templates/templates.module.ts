import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutDirectivesModule } from '../directives';
import { TemplateDefaultComponent } from './components';

const exportedDeclarations: any[] = [
  TemplateDefaultComponent
];

@NgModule({
  imports: [CommonModule, LayoutDirectivesModule, RouterModule],
  declarations: exportedDeclarations,
  exports: [...exportedDeclarations, LayoutDirectivesModule]
})
export class LayoutTemplatesModule {}

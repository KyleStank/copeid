import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutDirectivesModule } from '../directives';
import { FooterDefaultComponent } from './components';

const exportedDeclarations: any[] = [
  FooterDefaultComponent
];

@NgModule({
  imports: [CommonModule, LayoutDirectivesModule],
  declarations: exportedDeclarations,
  exports: [...exportedDeclarations, LayoutDirectivesModule]
})
export class LayoutFootersModule {}

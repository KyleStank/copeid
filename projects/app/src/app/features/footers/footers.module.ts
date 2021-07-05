import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterDefaultComponent } from './components';

const exportedDeclarations: any[] = [
  FooterDefaultComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: exportedDeclarations,
  exports: exportedDeclarations
})
export class FootersModule {}

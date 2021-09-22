import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RecursivePropertyPipe } from './recursive-property.pipe';

const exportedDeclarations = [
  RecursivePropertyPipe
];

@NgModule({
  imports: [CommonModule],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class RecursivePropertyPipeModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpecimenCardModule } from '../../components';
import { InfoSingleRoutingModule } from './info-single-routing.module';
import { InfoSinglePageComponent } from './info-single.component';

const exportedDeclarations = [
  InfoSinglePageComponent
];

@NgModule({
  imports: [
    CommonModule,
    InfoSingleRoutingModule,
    SpecimenCardModule
  ],
  declarations: [exportedDeclarations],
  exports: [exportedDeclarations]
})
export class InfoSingleModule {}

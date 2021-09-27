import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Specimen, SpecimenDisplay, SpecimenGender } from '@app/features';

@Component({
  selector: 'app-specimen-card',
  templateUrl: './specimen-card.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecimenCardComponent {
  readonly enumSpecimenGender: typeof SpecimenGender = SpecimenGender;

  @Input()
  specimen: Specimen | SpecimenDisplay | undefined;
}

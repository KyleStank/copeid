import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-genuses',
  templateUrl: './admin-genuses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminGenusesComponent {
  constructor() {
    console.log('Genuses!');
  }
}

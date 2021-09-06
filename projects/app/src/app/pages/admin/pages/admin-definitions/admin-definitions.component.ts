import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-definitions',
  templateUrl: './admin-definitions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDefinitionsComponent {
  constructor() {
    console.log('Definitions!');
  }
}

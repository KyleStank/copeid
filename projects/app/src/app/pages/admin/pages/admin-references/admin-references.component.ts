import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-references',
  templateUrl: './admin-references.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReferencesComponent {
  constructor() {
    console.log('References!');
  }
}

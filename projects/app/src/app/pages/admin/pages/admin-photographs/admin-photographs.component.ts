import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-photographs',
  templateUrl: './admin-photographs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPhotographsComponent {
  constructor() {
    console.log('Photographs!');
  }
}

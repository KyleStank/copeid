import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-specimens',
  templateUrl: './admin-specimens.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSpecimensComponent {
  constructor() {
    console.log('Specimens!');
  }
}

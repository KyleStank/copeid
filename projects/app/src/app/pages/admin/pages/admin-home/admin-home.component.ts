import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminHomeComponent {
  constructor() {
    console.log('Home!');
  }
}

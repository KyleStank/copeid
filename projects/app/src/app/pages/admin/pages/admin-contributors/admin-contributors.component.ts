import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-contributors',
  templateUrl: './admin-contributors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContributorsComponent {
  constructor() {
    console.log('Contributors!');
  }
}

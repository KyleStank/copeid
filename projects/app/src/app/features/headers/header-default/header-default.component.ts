import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header-default',
  templateUrl: './header-default.component.html',
  styleUrls: ['./header-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderDefaultComponent {}

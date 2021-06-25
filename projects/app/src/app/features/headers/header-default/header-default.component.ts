import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-default',
  templateUrl: './header-default.component.html',
  styleUrls: ['./header-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderDefaultComponent {
  @Input()
  text: string | undefined;

  @Input()
  color: string | undefined;

  @Output()
  menuClick = new EventEmitter<MouseEvent>();
}

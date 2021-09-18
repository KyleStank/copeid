import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-admin-edit-section',
  templateUrl: './admin-edit-section.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEditSectionComponent {
  @Input()
  color: ThemePalette = 'primary';

  @Input()
  header?: string;
}

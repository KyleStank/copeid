import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-admin-edit-section',
  templateUrl: './admin-edit-section.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminEditSectionComponent implements OnChanges {
  @Input()
  color: ThemePalette = 'primary';
  colorClass?: string;

  @Input()
  header?: string;

  ngOnChanges(): void {
    this.colorClass = !!this.color ? `c-${this.color}` : undefined;
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-filter-section-card',
  templateUrl: './filter-section-card.component.html',
  styleUrls: ['./filter-section-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSectionCardComponent {
  @Input()
  color?: ThemePalette;
}

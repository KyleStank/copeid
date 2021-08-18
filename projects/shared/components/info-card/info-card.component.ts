import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoCardComponent {
  @Input()
  color?: ThemePalette;

  @Input()
  data?: any;

  @Input()
  headerProperty?: string;

  @Input()
  contentProperty?: string;

  @Input()
  copyHeader?: boolean;

  @Input()
  copyContent?: boolean;

  @Output()
  titleCopied = new EventEmitter<string>();

  @Output()
  contentCopied = new EventEmitter<string>();
}

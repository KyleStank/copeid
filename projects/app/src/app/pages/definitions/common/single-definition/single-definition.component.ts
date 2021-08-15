import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { Definition } from '@app/features';

@Component({
  selector: 'app-single-definition',
  templateUrl: './single-definition.component.html',
  styleUrls: ['./single-definition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleDefinitionComponent {
  @Input()
  color?: ThemePalette;

  @Input()
  definition?: Definition;

  @Output()
  titleCopied = new EventEmitter<string>();

  @Output()
  contentCopied = new EventEmitter<string>();
}

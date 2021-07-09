import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-template-default',
  templateUrl: './template-default.component.html',
  styleUrls: ['./template-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateDefaultComponent {}

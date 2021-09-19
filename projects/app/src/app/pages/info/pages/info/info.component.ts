import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  host: {
    'class': 'd-block'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoPageComponent implements OnDestroy {
  private readonly _destroyed = new Subject<void>();

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

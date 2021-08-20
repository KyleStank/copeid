import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Definition, DefinitionService } from '@app/features';
import { SnackBarService } from '@core';
import { createFadeTrigger, createListTrigger, createSlideFadeUpTrigger } from '@shared/animations';

@Component({
  selector: 'app-definitions',
  templateUrl: './definitions.component.html',
  styleUrls: ['./definitions.component.scss'],
  providers: [DefinitionService],
  animations: [
    createListTrigger('pageAnimations', '@*'),
    createSlideFadeUpTrigger('slideFadeUp'),
    createFadeTrigger('fadeInOut')
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefinitionsPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _definitionsSubject = new BehaviorSubject<Definition[]>([]);
  readonly definitions$ = this._definitionsSubject.asObservable();

  @HostBinding('@pageAnimations')
  animatePage: boolean = false;

  constructor(
    private readonly _clipboard: Clipboard,
    private readonly _definitionService: DefinitionService,
    private readonly _snackBarService: SnackBarService
  ) {
    this.definitions$ = this.definitions$.pipe(takeUntil(this._destroyed));
    this.definitions$.subscribe(() => this.animatePage = !this.animatePage);
  }

  ngOnInit(): void {
    this._definitionService.getAllEntities().subscribe(this._definitionsSubject.next.bind(this._definitionsSubject));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  copyToClipboard(text: string): void {
    this._clipboard.copy(text);
    this._snackBarService.open('Copied to clipboard', {
      action: 'OK',
      duration: 2000
    });
  }
}

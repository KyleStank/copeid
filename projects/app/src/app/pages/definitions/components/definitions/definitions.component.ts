import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Definition, DefinitionService } from '@app/features';
import { createListAnimation, createSlideFadeUpAnimation } from '@shared/animations';

@Component({
  selector: 'app-definitions',
  templateUrl: './definitions.component.html',
  styleUrls: ['./definitions.component.scss'],
  providers: [DefinitionService],
  animations: [
    createListAnimation('listAnimations', '@slideFadeUp'),
    createSlideFadeUpAnimation('slideFadeUp')
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefinitionsPageComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _definitionsSubject = new BehaviorSubject<Definition[]>([]);
  readonly definitions$ = this._definitionsSubject.asObservable();

  animateList: boolean = false;

  constructor(private readonly _definitionService: DefinitionService) {
    this.definitions$ = this.definitions$.pipe(takeUntil(this._destroyed));
    this.definitions$.subscribe(() => this.animateList = !this.animateList);
  }

  ngOnInit(): void {
    this._definitionService.getAllEntities().subscribe(this._definitionsSubject.next.bind(this._definitionsSubject));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

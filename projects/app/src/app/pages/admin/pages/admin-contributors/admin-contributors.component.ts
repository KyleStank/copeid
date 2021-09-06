import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { Contributor, ContributorService } from '@app/features';
import { AdminColumn } from '../../common';

@Component({
  selector: 'app-admin-contributors',
  templateUrl: './admin-contributors.component.html',
  providers: [ContributorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContributorsComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _contributorsSubject = new BehaviorSubject<Contributor[]>([]);
  readonly contributors$ = this._contributorsSubject.asObservable();
  public readonly columns: AdminColumn[] = [
    { title: 'Name', property: 'name' }
  ];

  readonly singularName = 'Contributor';
  readonly pluralName = 'Contributors';

  selectedEntities: Contributor[] = [];

  constructor(private readonly _contributorService: ContributorService) {
    this.contributors$ = this.contributors$.pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this.getEntities();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  getEntities(): void {
    this._contributorService.getAll().subscribe(this._contributorsSubject.next.bind(this._contributorsSubject));
  }

  editAddEntity(model?: Contributor): void {
    console.log('Edit/Add:', model);
  }

  deleteEntities(models: Contributor[]): void {
    console.log('Delete:', models);
  }

  toggleEntity(models?: Contributor[]): void {
    this.selectedEntities = models?.filter(x => (x as any).selected) ?? [];
  }
}

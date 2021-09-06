import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _contributorService: ContributorService,
    private readonly _router: Router
  ) {
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
    if (!!model?.id) {
      this._router.navigate([model.id, 'edit'], { relativeTo: this._activatedRoute });
    }
  }

  deleteEntities(models: Contributor[]): void {
    console.log('Delete:', models);
  }

  toggleEntity(models?: Contributor[]): void {
    this.selectedEntities = models?.filter(x => (x as any).selected) ?? [];
  }
}

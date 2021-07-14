import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Contributor, ContributorService } from '@app/features';

@Component({
  selector: 'app-admin-contributors',
  templateUrl: './admin-contributors.component.html',
  styleUrls: ['./admin-contributors.component.scss'],
  providers: [ContributorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContributorsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _contributors = new BehaviorSubject<Contributor[]>([]);
  readonly contributors$: Observable<Contributor[]>;

  readonly dataSource = new MatTableDataSource<Contributor>();
  readonly columns = ['name', 'options'];

  @ViewChild(MatSort, { static: true })
  sort: MatSort | undefined;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator | undefined;

  constructor(
    private readonly _detectorRef: ChangeDetectorRef,
    private readonly _contributorService: ContributorService
  ) {
    this.contributors$ = this._contributors.asObservable()
      .pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this._contributorService.getAllEntities().subscribe(this._contributors.next.bind(this._contributors));

    this.contributors$.subscribe((contributors: Contributor[]) => this.dataSource.data = contributors);
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

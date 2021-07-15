import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ConfirmationAlertModalCompoonent } from '@shared';
import { Contributor, ContributorService } from '@app/features';
import { AdminEditModalComponent } from '../../modals';

@Component({
  selector: 'app-tester-comp',
  template: `<h1>Component portal!</h1>`
})
export class TesterComponent {}

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

  selectedPortal: Portal<any> | undefined;

  constructor(
    private readonly _detectorRef: ChangeDetectorRef,
    private readonly _contributorService: ContributorService,
    private readonly _dialog: MatDialog
  ) {
    this.contributors$ = this._contributors.asObservable()
      .pipe(takeUntil(this._destroyed));
  }

  ngOnInit(): void {
    this._contributorService.getAllEntities().subscribe(this._contributors.next.bind(this._contributors));

    this.contributors$.subscribe((contributors: Contributor[]) => this.dataSource.data = contributors);
  }

  ngAfterViewInit(): void {
    const portal = new ComponentPortal(TesterComponent);
    this.selectedPortal = portal;

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  editContributor(contributor: Contributor): void {
    const dialogRef = this._dialog.open(AdminEditModalComponent, {
      data: {
        name: 'Test'
      },
      width: '500px'
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._destroyed))
      .subscribe(
        (result) => {
          console.log('Result:', result);
        }
      );
  }

  deleteContributor(contributor: Contributor): void {
    const dialogRef = this._dialog.open(ConfirmationAlertModalCompoonent, {
      data: {
        title: 'Delete Contributor?',
        message: `Are you sure you want to delete contributor "${contributor.name}"?`
      },
      width: '500px'
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._destroyed))
      .subscribe(
        (result) => {
          console.log('Result:', result);
        }
      );
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

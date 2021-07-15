import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ConfirmationAlertModalCompoonent, recursivePropertySearch } from '@shared';
import { Contributor, ContributorService } from '@app/features';
import { AdminEditModalComponent } from '../../modals';

export interface IndexedItem<T> {
  index: number;
  selected: boolean;
  value: T;
}

@Component({
  selector: 'app-admin-contributors',
  templateUrl: './admin-contributors.component.html',
  styleUrls: ['./admin-contributors.component.scss'],
  providers: [ContributorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminContributorsPageComponent implements AfterViewInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private readonly _contributors = new BehaviorSubject<Contributor[]>([]);
  readonly contributors$: Observable<Contributor[]>;

  readonly dataSource = new MatTableDataSource<IndexedItem<Contributor>>();
  readonly columns = ['select', 'name', 'options'];

  @ViewChild(MatSort, { static: true })
  sort: MatSort | undefined;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator | undefined;

  selectedContributors: IndexedItem<Contributor>[] | any[] = [];

  constructor(
    private readonly _detectorRef: ChangeDetectorRef,
    private readonly _contributorService: ContributorService,
    private readonly _dialog: MatDialog
  ) {
    this.contributors$ = this._contributors.asObservable()
      .pipe(takeUntil(this._destroyed));

    this._contributorService.getAllEntities().subscribe(this._contributors.next.bind(this._contributors));
    this.contributors$.subscribe((contributors: Contributor[]) => {
      this.dataSource.data = this.createIndexedData(contributors);
      this._detectorRef.markForCheck();
    });

    this.dataSource.sortingDataAccessor = (item, property) => recursivePropertySearch(item.value, property);
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  createIndexedData(data: Contributor[]): IndexedItem<Contributor>[] {
    return data.map((item, index) => ({
      index,
      value: item,
      selected: false
    })) as IndexedItem<Contributor>[];
  }

  toggleContributor(item: IndexedItem<Contributor>): void {
    if (item) {
      item.selected = !item.selected;

      const index = this.selectedContributors.indexOf(item);
      if (item.selected && index === -1) {
        this.selectedContributors.push(item);
      } else if (!item.selected && index !== -1) {
        this.selectedContributors.splice(index, 1);
      }
    }
  }

  editContributor(contributor: Contributor): void {
    const dialogRef = this._dialog.open(AdminEditModalComponent, {
      data: {
        title: 'Edit Contributor',
        model: contributor
      },
      width: '500px'
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._destroyed))
      .subscribe(this._saveContributor.bind(this));
  }

  private _saveContributor(contributor: Contributor): void {
    console.log('Save:', contributor);
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

  newContributor(): void {
    const dialogRef = this._dialog.open(AdminEditModalComponent, {
      data: {
        title: 'Create Contributor'
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

  deleteSelectedContributors(): void {
    const dialogRef = this._dialog.open(ConfirmationAlertModalCompoonent, {
      data: {
        title: `Delete Selected ${this.selectedContributors.length === 1 ? 'Contributor' : 'Contributors'}?`,
        message: `Are you sure you want to delete ${this.selectedContributors.length === 1 ? 'this contributor' : 'these contributors'}?`
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

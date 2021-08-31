import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

import { recursivePropertySearch } from '@shared/utils';
import { SimpleDataColumn } from './simple-data-column.model';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss'],
  host: {
    'class': 'overflow-auto'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleTableComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private _initialized = false;

  readonly dataSource = new MatTableDataSource<any>();

  @Input()
  data: any[] = [];

  @Input()
  columns: SimpleDataColumn[] = [];

  constructor(readonly changeDetectorRef: ChangeDetectorRef) {
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => recursivePropertySearch(data, sortHeaderId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = this.data ?? [];
    this.columns = this.columns ?? [];

    // TODO: Only reset data after application is initialized. This is due to performance issues where data is set before sort/paginator.
    if (this._initialized) {
      // this.setData(this.data);
    }
  }

  ngOnInit(): void {
    this.setData(this.data);
    this._initialized = true;
  }

  setData(data: any[]): void {
    this.dataSource.data = data ?? [];

    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    // TODO: Set sort and paginator.
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

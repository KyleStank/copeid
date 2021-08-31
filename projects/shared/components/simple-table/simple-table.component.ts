import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
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
export class SimpleTableComponent implements OnChanges, AfterViewInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private _initialized = false;

  readonly dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort, { static: true })
  sort: MatSort | undefined;

  @Input()
  data: any[] = [];

  @Input()
  columns: SimpleDataColumn[] = [];

  columnNames: string[] = [];

  constructor(readonly changeDetectorRef: ChangeDetectorRef) {
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => recursivePropertySearch(data, sortHeaderId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = this.data ?? [];
    this.columns = this.columns ?? [];
    this.columnNames = this.columns.map(c => c.property);

    if (this._initialized) {
      this.setData(this.data);
    }
  }

  setData(data: any[]): void {
    this.dataSource.data = data ?? [];

    this.changeDetectorRef.markForCheck();
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    // TODO: Set paginator.
    this.dataSource.sort = this.sort ?? this.dataSource.sort;
    // this.dataSource.paginator = this.paginator;

    this.setData(this.data);
    this._initialized = true;
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}

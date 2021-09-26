import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { recursivePropertySearch } from '@shared/utils';
import { AutoColumnDefDirective, AutoPaginatorDirective } from '../../directives';

type DataItem = { index: number; value: any };

@Component({
  selector: 'auto-table',
  templateUrl: 'auto-table.component.html',
  styleUrls: ['auto-table.component.scss'],
  host: {
    'class': 'd-block w-100'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AutoTableComponent implements OnChanges, AfterContentInit, AfterViewInit {
  private _isFirstChange = true;

  @ContentChild(AutoPaginatorDirective)
  autoPaginator: AutoPaginatorDirective | undefined;

  @ContentChildren(AutoColumnDefDirective, { descendants: true })
  autoColumnDefs: QueryList<AutoColumnDefDirective> | undefined;

  @ViewChild(MatSort)
  matSort: MatSort | undefined;

  @Input()
  columns: string[] = [];

  @Input()
  customSorter: ((item: DataItem, sortId: string) => string | number) | undefined;

  @Input()
  data: any[] = [];

  @Input()
  sort: Sort | undefined;

  @Output()
  sortChange = new EventEmitter<Sort>();

  readonly dataSource = new MatTableDataSource<DataItem>([]);
  columnDefs: AutoColumnDefDirective[] = [];
  columnProps: string[] = [];

  isEmpty = false;

  constructor(readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.dataSource.sortingDataAccessor = this.customSorter ??
      ((item: DataItem, property: string) => recursivePropertySearch(item.value, property));

    if (!!this.sort && !!this.dataSource.sort && !this._isFirstChange) {
      this.dataSource.sort.active = this.sort.active;
      this.dataSource.sort.direction = this.sort.direction;
    }

    this.data = this.data ?? [];
    if (!!this.data && !this._isFirstChange) {
      this._refreshDataSource();
    }

    this.columns = this.columns ?? [];
    if (!!this.columns && !this._isFirstChange) {
      this._refreshColumns(this.autoColumnDefs?.toArray() || []);
    }

    this._isFirstChange = false;
  }

  ngAfterContentInit(): void {
    if (!!this.autoPaginator?.paginator && !this.autoPaginator?.controlManually) {
      this.dataSource.paginator = this.autoPaginator.paginator;
    }

    if (this.autoColumnDefs) {
      this._refreshColumns(this.autoColumnDefs.toArray());
    }

    this._refreshDataSource(); // Data should initially be set after the paginator and sorter due to performance reasons.
  }

  ngAfterViewInit(): void {
    if (!!this.matSort) {
      this.matSort.active = this.sort?.active ?? this.matSort.active;
      this.matSort.direction = this.sort?.direction ?? this.matSort.direction;
      this.dataSource.sort = this.matSort;
    }
  }

  sorted(sort: Sort): void {
    this.sort = sort;
    this.sortChange.emit(this.sort);
  }

  /**
   * Refreshes the column definitions based on the columns input and AutoPropertyColumnDef directives.
   */
  private _refreshColumns(autoColumnDefs: AutoColumnDefDirective[]): void {
    const columnDefs = this.columns.length === 0 ?
      autoColumnDefs :
      autoColumnDefs.filter(x => this.columns.includes(x.property));

    this.columnDefs = columnDefs;
    this.columnProps = this.columnDefs.map(x => x.property);
  }

  /**
   * Refreshes the Material table's data source data.
   *
   * @note
   * Due to MatTableDataSource acting weirdly with OnPush components, this function invokes both detectChanges() and markForCheck().
   */
  private _refreshDataSource(): void {
    const dataItems: DataItem[] = Array(this.data.length);
    for (let i = 0; i < dataItems.length; i++) {
      dataItems[i] = { index: i, value: this.data[i] };
    }

    this.dataSource.data = dataItems;
    this.isEmpty = this.dataSource.data.length === 0;

    this.changeDetectorRef.detectChanges();
    this.changeDetectorRef.markForCheck();
  }
}

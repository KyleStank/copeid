import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
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

  @ViewChild(MatSort)
  matSort: MatSort | undefined;

  @ContentChild(AutoPaginatorDirective)
  autoPaginator: AutoPaginatorDirective | undefined;

  @ContentChildren(AutoColumnDefDirective, { descendants: true })
  autoColumnDefs: QueryList<AutoColumnDefDirective> | undefined;

  @Input()
  data: any[] = [];

  @Input()
  columns: string[] = [];

  readonly dataSource = new MatTableDataSource<DataItem>([]);
  columnDefs: AutoColumnDefDirective[] = [];
  columnProps: string[] = [];

  isEmpty = false;

  constructor(readonly changeDetectorRef: ChangeDetectorRef) {
    this.dataSource.sortingDataAccessor = (item: DataItem, property: string) => recursivePropertySearch(item.value, property);

    setInterval(() => {
      console.log(this.dataSource.data.length === 0);
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    }, 5000);
  }

  ngOnChanges(): void {
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
    this.dataSource.paginator = this.autoPaginator?.paginator ?? this.dataSource.paginator;

    if (this.autoColumnDefs) {
      this._refreshColumns(this.autoColumnDefs.toArray());
    }

    this._refreshDataSource(); // Data should initially be set after the paginator and sorter due to performance reasons.
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort ?? this.dataSource.sort;
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

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

export type AutoTableItem<T = any> = { index: number; value: T; };

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
  customSorter: ((item: AutoTableItem, sortId: string) => string | number) | undefined;

  @Input()
  data: any[] = [];

  @Output()
  sortChange = new EventEmitter<Sort>();

  readonly dataSource = new MatTableDataSource<AutoTableItem>([]);
  columnDefs: AutoColumnDefDirective[] = [];
  columnProps: string[] = [];

  isEmpty = false;

  constructor(readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.data = this.data ?? [];
    this.columns = this.columns ?? [];
    if (!this._isFirstChange) {
      if (!!this.data) this._refreshDataSource();
      if (!!this.columns) this._refreshColumns(this.autoColumnDefs?.toArray() || []);
      this._refreshSorter();
    }

    this._isFirstChange = false;
  }

  ngAfterContentInit(): void {
    if (!!this.autoPaginator?.paginator && !this.autoPaginator?.controlManually) this.dataSource.paginator = this.autoPaginator.paginator;
    if (!!this.autoColumnDefs) this._refreshColumns(this.autoColumnDefs.toArray());
    this._refreshDataSource(); // Data should initially be set after the paginator and sorter due to performance reasons.
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.matSort ?? this.dataSource.sort;
    this._refreshSorter();
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
    const dataItems: AutoTableItem[] = Array(this.data.length);
    for (let i = 0; i < dataItems.length; i++) dataItems[i] = { index: i, value: this.data[i] };

    this.dataSource.data = dataItems;
    this.isEmpty = this.dataSource.data.length === 0;

    this.changeDetectorRef.detectChanges();
    this.changeDetectorRef.markForCheck();
  }

  /**
   * Refreshes the `sortingDataAccessor` of the table `dataSource` depending on the state of the table.
   */
  private _refreshSorter(): void {
    if (!!this.customSorter) this.dataSource.sortingDataAccessor = this.customSorter;
    else if (this.autoPaginator?.controlManually) this.dataSource.sortingDataAccessor = () => '';
    else this.dataSource.sortingDataAccessor = this.dataSource.sortingDataAccessor = (item, property) => recursivePropertySearch(item.value, property);
  }

  sorted(sort: Sort): void {
    if (!!this.autoPaginator?.paginator && this.autoPaginator?.controlManually) this.autoPaginator.paginator.firstPage();
    this.sortChange.emit(sort);
  }
}

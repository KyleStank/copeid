import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-data-table',
  templateUrl: './admin-data-table.component.html',
  styleUrls: ['./admin-data-table.component.html'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDataTableComponent implements OnChanges, AfterViewInit {
  readonly dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort, { static: true })
  sort: MatSort | undefined;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator | undefined;

  @Input()
  data: any[] | undefined | null = [];

  @Input()
  columns: string[] = [];

  ngOnChanges(): void {
    if (this.data) {
      this.dataSource.data = this.data;
    }
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}

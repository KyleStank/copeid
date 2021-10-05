import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import { AutoTableComponent, AutoTableItem } from '@shared/components/auto-table';
import { AdminDataTableMenuDirective } from './admin-data-table-menu.directive';

export interface AdminSelectionItem {
  selected: boolean;
}

export interface AdminColumn {
  title: string;
  property: string;
}

@Component({
  selector: 'app-admin-data-table',
  templateUrl: './admin-data-table.component.html',
  styleUrls: ['./admin-data-table.component.scss'],
  host: {
    'class': 'd-block w-100'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AdminDataTableComponent implements OnChanges {
  @ViewChild(AutoTableComponent, { static: true })
  autoTable?: AutoTableComponent;

  @ContentChild(AdminDataTableMenuDirective, { static: true })
  adminMenuDirective?: AdminDataTableMenuDirective;

  @Input()
  columns: AdminColumn[] = [];

  @Input()
  data: any[] | undefined | null = [];
  selectionData: AdminSelectionItem[] = [];

  @Input()
  pageIndex = 0;

  @Input()
  paginatorLength = 0;

  @Input()
  pageSize = 10;

  @Output()
  paged = new EventEmitter<PageEvent>();

  @Output()
  pageIndexChange = new EventEmitter<number>();

  @Output()
  pageSizeChange = new EventEmitter<number>();

  @Output()
  selected = new EventEmitter<AdminSelectionItem[]>();

  @Output()
  sortChange = new EventEmitter<Sort>();

  ngOnChanges(): void {
    this.data = this.data ?? [];
    this.selectionData = this._createSelectionItems(this.data);

    this.columns = this.columns ?? [];
  }

  private _createSelectionItems(items: any[]): AdminSelectionItem[] {
    return items?.map(x => ({
      ...x,
      selected: false
    })) as AdminSelectionItem[] ?? [] as AdminSelectionItem[];
  }

  toggleItem(item: AdminSelectionItem): void {
    item.selected = !item.selected;
    this.selected.emit(this.selectionData.filter(x => x.selected));
  }

  paginatorInteracted(pageEvent: PageEvent): void {
    this.pageIndex = pageEvent.pageIndex;
    this.pageIndexChange.emit(this.pageIndex);

    this.pageSize = pageEvent.pageSize;
    this.pageSizeChange.emit(this.pageSize);

    this.paged.emit(pageEvent);
  }
}

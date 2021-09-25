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

import { AutoTableComponent } from '@shared/components/auto-table';
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
  paginatorLength = 0;

  @Output()
  paged = new EventEmitter<PageEvent>();

  @Output()
  selected = new EventEmitter<AdminSelectionItem[]>();

  currentPageIndex = 0;
  currentPageSize = 10;

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
    this.currentPageIndex = pageEvent.pageIndex;
    this.currentPageSize = pageEvent.pageSize;
    this.paged.emit(pageEvent);
  }
}

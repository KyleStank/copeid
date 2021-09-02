import {
  AfterContentInit,
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
export class AdminDataTableComponent implements OnChanges, AfterContentInit {
  @ViewChild(AutoTableComponent, { static: true })
  autoTable?: AutoTableComponent;

  @ContentChild(AdminDataTableMenuDirective, { static: true })
  adminMenuDirective?: AdminDataTableMenuDirective;

  @Input()
  data: any[] | undefined | null = [];
  selectionData: AdminSelectionItem[] = [];

  @Input()
  columns: AdminColumn[] = [];

  @Output()
  selected = new EventEmitter<AdminSelectionItem[]>();

  @Output()
  edit = new EventEmitter<AdminSelectionItem>();

  @Output()
  remove = new EventEmitter<AdminSelectionItem>();

  ngOnChanges(): void {
    this.data = this.data ?? [];
    this.selectionData = this._createSelectionItems(this.data);

    this.columns = this.columns ?? [];
  }

  ngAfterContentInit(): void {
    if (!!this.adminMenuDirective) {
      this.adminMenuDirective.render
    }
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
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

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
export class AdminDataTableComponent {
  @Input()
  data: any[] | undefined | null = [];

  @Output()
  toggle = new EventEmitter<any>();

  @Output()
  edit = new EventEmitter<any>();

  @Output()
  delete = new EventEmitter<any>();

  toggleEntity(e: any): void {
    console.log('T:', e);
  }

  editEntity(e: any): void {
    console.log('E:', e);
  }

  deleteEntity(e: any): void {
    console.log('D:', e);
  }
}

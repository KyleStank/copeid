import { AfterViewInit, ChangeDetectorRef, Component, Directive, Inject, InjectionToken, Injector, OnDestroy, Optional, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AbstractEntityService, IEntity } from '@core';
import { ConfirmationAlertModalCompoonent, recursivePropertySearch } from '@shared';
import { AdminEditModalComponent } from '../modals';

export interface IndexedItem<TItem> {
  index: number;
  selected: boolean;
  value: TItem;
}

export interface EntitySetup {
  singularName: string;
  pluralName: string;
}

export const ENTITY_SERVICE = new InjectionToken<AbstractEntityService<any, any>>('ENTITY_SERVICE');
export const ENTITY_SETUP = new InjectionToken<EntitySetup>('ENTITY_SETUP');

@Component({
  templateUrl: './admin-page.abstract.html',
  styleUrls: ['./admin-page.abstract.scss']
})
export class AbstractAdminPage<TEntity extends IEntity> implements AfterViewInit, OnDestroy {
  protected readonly _destroyed = new Subject<void>();

  protected readonly _entities = new BehaviorSubject<TEntity[]>([]);
  protected readonly entities$: Observable<TEntity[]>;

  protected readonly _detectorRef: ChangeDetectorRef;
  protected readonly _dialog: MatDialog;

  public readonly singularName: string;
  public readonly pluralName: string;

  public readonly dataSource = new MatTableDataSource<IndexedItem<TEntity>>();
  public readonly columns = ['select', 'name', 'options'];

  @ViewChild(MatSort, { static: true })
  public sort: MatSort | undefined;

  @ViewChild(MatPaginator, { static: true })
  public paginator: MatPaginator | undefined;

  public selectedEntities: IndexedItem<TEntity>[] = [];

  constructor(
    protected readonly _injector: Injector,
    @Inject(ENTITY_SERVICE) protected readonly _entityService: AbstractEntityService<TEntity>,
    @Inject(ENTITY_SETUP) @Optional() protected readonly _entitySetup?: EntitySetup
  ) {
    this._detectorRef = this._injector.get(ChangeDetectorRef);
    this._dialog = this._injector.get(MatDialog);

    this.entities$ = this._entities.asObservable()
      .pipe(takeUntil(this._destroyed));

    this._entityService.getAllEntities().subscribe(this._entities.next.bind(this._entities) as any);
    this.entities$.subscribe((entities: TEntity[]) => {
      this.selectedEntities = [];
      this.dataSource.data = this._createIndexedData(entities);
      this._detectorRef.markForCheck();
    });

    this.dataSource.sortingDataAccessor = (item, property) => recursivePropertySearch(item.value, property);

    this.singularName = this._entitySetup?.singularName ?? 'Entity';
    this.pluralName = this._entitySetup?.pluralName ?? 'Entities';
  }

  protected _createIndexedData(data: TEntity[]): IndexedItem<TEntity>[] {
    return data.map((item, index) => ({
      index,
      value: item,
      selected: false
    })) as IndexedItem<TEntity>[];
  }

  public ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public newEntity(): void {
    const dialogRef = this._dialog.open(AdminEditModalComponent, {
      data: {
        title: `Create ${this.singularName}`
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._destroyed))
      .subscribe(this._saveEntity.bind(this));
  }

  public editEntity(entity: TEntity): void {
    const dialogRef = this._dialog.open(AdminEditModalComponent, {
      data: {
        title: `Edit ${this.singularName}`,
        model: entity
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._destroyed))
      .subscribe(this._saveEntity.bind(this));
  }

  protected _saveEntity(entity: TEntity): void {
    if (!entity) return;

    if (entity.id) {
      this._entityService.updateEntity(entity).subscribe({
        next: (result: any) => { // TODO: Replace any
          const entities = this._entities.value;
          const index = entities.findIndex(c => c.id === result.id);
          if (index !== -1) {
            entities[index] = result;
          }

          this._entities.next(entities);
        },
        error: (error: any) => console.error('Error:', error)
      });
    } else {
      this._entityService.createEntity(entity).subscribe({
        next: (result: any) => { // TODO: Replace any
          this._entities.next([...this._entities.value, result]);
        },
        error: (error: any) => console.error('Error:', error)
      });
    }
  }

  public deleteSelectedEntities(): void {
    const dialogRef = this._dialog.open(ConfirmationAlertModalCompoonent, {
      data: {
        title: `Delete Selected ${this.selectedEntities.length === 1 ? this.singularName : this.pluralName}?`,
        message: (
          'Are you sure you want to delete' + ' ' +
          `${this.selectedEntities.length === 1 ? `this ${this.singularName}` : `these ${this.pluralName}`}?`
        )
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._destroyed))
      .subscribe(
        (result: boolean) => {
          if (result) {
            // TODO: DO NOT use a loop in production. Create an endpoint that accepts an array of IDs instead.
            const entities = this.selectedEntities.map(x => x.value);
            entities.forEach(e => this._deleteEntity(e));
          }
        }
      );
  }

  public deleteEntity(entities: TEntity): void {
    const dialogRef = this._dialog.open(ConfirmationAlertModalCompoonent, {
      data: {
        title: `Delete ${this.singularName}`,
        message: `Are you sure you want to delete this ${this.singularName}?`
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this._destroyed))
      .subscribe(
        (result: boolean) => {
          if (result) {
            this._deleteEntity(entities);
          }
        }
      );
  }

  protected _deleteEntity(entity: TEntity): void {
    if (!entity) return;

    this._entityService.deleteEntity(entity.id as string).subscribe({
      next: () => {
        let entities = this._entities.value;
        const index = entities.findIndex(c => c.id === entity.id);
        if (index !== -1) {
          entities.splice(index, 1);
        }

        this._entities.next(entities);
      },
      error: (error: any) => console.error('Error:', error)
    });
  }

  public toggleEntity(item: IndexedItem<TEntity>): void {
    if (item) {
      item.selected = !item.selected;

      const index = this.selectedEntities.indexOf(item);
      if (item.selected && index === -1) {
        this.selectedEntities.push(item);
      } else if (!item.selected && index !== -1) {
        this.selectedEntities.splice(index, 1);
      }
    }
  }
}

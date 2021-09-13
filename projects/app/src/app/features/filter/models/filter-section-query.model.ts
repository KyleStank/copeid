import { IEntityQuery } from '@core/models/entity';

export interface IFilterSectionQuery extends IEntityQuery {
  filterId: string[] | undefined;
  filterModelPropertyId: string[] | undefined;
  code: string[] | undefined;
  displayName: string[] | undefined;
}

export class FilterSectionQuery implements IFilterSectionQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public filterId: string[] | undefined;
  public filterModelPropertyId: string[] | undefined;
  public code: string[] | undefined;
  public displayName: string[] | undefined;

  constructor(model?: Partial<IFilterSectionQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.filterId = model?.filterId;
    this.filterModelPropertyId = model?.filterModelPropertyId;
    this.code = model?.code;
    this.displayName = model?.displayName;
  }
}

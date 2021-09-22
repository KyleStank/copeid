import { IEntityQuery } from '@core/models/entity';

export interface IFilterSectionPartQuery extends IEntityQuery {
  filterSectionId: string[] | undefined;
  filterModelPropertyId: string[] | undefined;
  order: number[] | undefined;
  displayName: string[] | undefined;
}

export class FilterSectionPartQuery implements IFilterSectionPartQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public filterSectionId: string[] | undefined;
  public filterModelPropertyId: string[] | undefined;
  public order: number[] | undefined;
  public displayName: string[] | undefined;

  constructor(model?: Partial<IFilterSectionPartQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.filterSectionId = model?.filterSectionId;
    this.filterModelPropertyId = model?.filterModelPropertyId;
    this.order = model?.order;
    this.displayName = model?.displayName;
  }
}

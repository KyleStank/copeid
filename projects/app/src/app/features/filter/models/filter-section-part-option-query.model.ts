import { IEntityQuery } from '@core/models/entity';

export interface IFilterSectionPartOptionQuery extends IEntityQuery {
  filterSectionPartId: string[] | undefined;
  displayName: string[] | undefined;
  code: string[] | undefined;
  value: string[] | undefined;
}

export class FilterSectionPartOptionQuery implements IFilterSectionPartOptionQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public filterSectionPartId: string[] | undefined;
  public displayName: string[] | undefined;
  public code: string[] | undefined;
  public value: string[] | undefined;

  constructor(model?: Partial<IFilterSectionPartOptionQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.filterSectionPartId = model?.filterSectionPartId;
    this.displayName = model?.displayName;
    this.code = model?.code;
    this.value = model?.value;
  }
}

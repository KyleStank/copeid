import { IEntityQuery } from '@core/models/entity';

export interface IFilterSectionOptionQuery extends IEntityQuery {
  filterSectionId: string[] | undefined;
  displayName: string[] | undefined;
  code: string[] | undefined;
  value: string[] | undefined;
}

export class FilterSectionOptionQuery implements IFilterSectionOptionQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public filterSectionId: string[] | undefined;
  public displayName: string[] | undefined;
  public code: string[] | undefined;
  public value: string[] | undefined;

  constructor(model?: Partial<IFilterSectionOptionQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.filterSectionId = model?.filterSectionId;
    this.displayName = model?.displayName;
    this.code = model?.code;
    this.value = model?.value;
  }
}

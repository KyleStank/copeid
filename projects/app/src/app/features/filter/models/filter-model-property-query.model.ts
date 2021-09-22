import { IEntityQuery } from '@core/models/entity';

export interface IFilterModelPropertyQuery extends IEntityQuery {
  filterModelId: string[] | undefined;
  propertyName: string[] | undefined;
}

export class FilterModelPropertyQuery implements IFilterModelPropertyQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public filterModelId: string[] | undefined;
  public propertyName: string[] | undefined;

  constructor(model?: Partial<IFilterModelPropertyQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.filterModelId = model?.filterModelId;
    this.propertyName = model?.propertyName;
  }
}

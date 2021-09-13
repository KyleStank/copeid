import { IEntityQuery } from '@core/models/entity';

export interface IFilterQuery extends IEntityQuery {
  filterModelId: string[] | undefined;
  displayName: string[] | undefined;
}

export class FilterQuery implements IFilterQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public filterModelId: string[] | undefined;
  public displayName: string[] | undefined;

  constructor(model?: Partial<IFilterQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.filterModelId = model?.filterModelId;
    this.displayName = model?.displayName;
  }
}

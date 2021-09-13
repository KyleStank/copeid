import { IEntityQuery } from '@core/models/entity';

export interface IFilterModelQuery extends IEntityQuery {
  typeName: string[] | undefined;
}

export class FilterModelQuery implements IFilterModelQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public typeName: string[] | undefined;

  constructor(model?: Partial<IFilterModelQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.typeName = model?.typeName;
  }
}

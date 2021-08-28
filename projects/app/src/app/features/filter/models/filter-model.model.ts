import { IEntity } from '@core/models/entity';

export interface IFilterModel extends IEntity {
  typeName: string | undefined;
}

export class FilterModel implements IFilterModel {
  public id: string | undefined;
  public typeName: string | undefined;

  constructor(model?: Partial<IFilterModel>) {
    this.id = model?.id;
    this.typeName = model?.typeName;
  }
}

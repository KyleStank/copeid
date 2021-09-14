import { IEntity } from '@core/models/entity';

import { FilterModelProperty } from './filter-model-property.model';

export interface IFilterModel extends IEntity {
  typeName: string | undefined;
  filterModelProperties: FilterModelProperty[] | undefined;
}

export class FilterModel implements IFilterModel {
  public id: string | undefined;
  public typeName: string | undefined;
  public filterModelProperties: FilterModelProperty[] | undefined;

  constructor(model?: Partial<IFilterModel>) {
    this.id = model?.id;
    this.typeName = model?.typeName;
    this.filterModelProperties = model?.filterModelProperties;
  }
}

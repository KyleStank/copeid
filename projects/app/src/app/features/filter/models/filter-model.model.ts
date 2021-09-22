import { IEntity } from '@core/models/entity';

import { Filter } from './filter.model';
import { FilterModelProperty } from './filter-model-property.model';

export interface IFilterModel extends IEntity {
  typeName: string | undefined;
  filterModelProperties: FilterModelProperty[] | undefined;
  filters: Filter[] | undefined;
}

export class FilterModel implements IFilterModel {
  public id: string | undefined;
  public typeName: string | undefined;
  public filterModelProperties: FilterModelProperty[] | undefined;
  public filters: Filter[] | undefined;

  constructor(model?: Partial<IFilterModel>) {
    this.id = model?.id;
    this.typeName = model?.typeName;
    this.filterModelProperties = model?.filterModelProperties;
    this.filters = model?.filters;
  }
}

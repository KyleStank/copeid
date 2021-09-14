import { IEntity } from '@core/models/entity';

import { FilterModel } from './filter-model.model';

export interface IFilterModelProperty extends IEntity {
  filterModelId: string | undefined;
  propertyName: string | undefined;
  filterModel: FilterModel | undefined;
}

export class FilterModelProperty implements IFilterModelProperty {
  public id: string | undefined;
  public filterModelId: string | undefined;
  public propertyName: string | undefined;
  public filterModel: FilterModel | undefined;

  constructor(model?: Partial<IFilterModelProperty>) {
    this.id = model?.id;
    this.filterModelId = model?.filterModelId;
    this.propertyName = model?.propertyName;
    this.filterModel = model?.filterModel;
  }
}

import { IEntity } from '@core/models/entity';

export interface IFilterModelProperty extends IEntity {
  filterModelId: string | undefined;
  propertyName: string | undefined;
}

export class FilterModelProperty implements IFilterModelProperty {
  public id: string | undefined;
  public filterModelId: string | undefined;
  public propertyName: string | undefined;

  constructor(model?: Partial<IFilterModelProperty>) {
    this.id = model?.id;
    this.filterModelId = model?.filterModelId;
    this.propertyName = model?.propertyName;
  }
}

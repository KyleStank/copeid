import { IEntity } from '@core/models/entity';

export interface IFilter extends IEntity {
  filterModelId: string | undefined;
  displayName: string | undefined;
}

export class Filter implements IFilter {
  public id: string | undefined;
  public filterModelId: string | undefined;
  public displayName: string | undefined;

  constructor(model?: Partial<IFilter>) {
    this.id = model?.id;
    this.filterModelId = model?.filterModelId;
    this.displayName = model?.displayName;
  }
}

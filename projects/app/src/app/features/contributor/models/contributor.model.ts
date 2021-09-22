import { IEntity } from '@core/models/entity';

export interface IContributor extends IEntity {
  name: string | undefined;
  description: string | undefined;
}

export class Contributor implements IContributor {
  public id: string | undefined;
  public name: string | undefined;
  public description: string | undefined;

  constructor(model?: Partial<IContributor>) {
    this.id = model?.id;
    this.name = model?.name;
    this.description = model?.description;
  }
}

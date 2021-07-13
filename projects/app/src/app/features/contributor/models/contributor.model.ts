import { IEntity, Nullable } from '@core';

export interface IContributor extends IEntity {
  name: Nullable<string>;
}

export class Contributor implements IContributor {
  public id: Nullable<string>;
  public name: Nullable<string>;

  constructor(model?: IContributor) {
    this.id = model?.id;
    this.name = model?.name;
  }
}

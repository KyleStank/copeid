import { IEntity, Nullable } from '@core';

export interface IReference extends IEntity {
  content: Nullable<string>;
}

export class Reference implements IReference {
  public id: Nullable<string>;
  public content: Nullable<string>;

  constructor(model?: IReference) {
    this.id = model?.id;
    this.content = model?.content;
  }
}

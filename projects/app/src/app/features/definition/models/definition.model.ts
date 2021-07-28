import { IEntity, Nullable } from '@core';

export interface IDefinition extends IEntity {
  name: Nullable<string>;
  meaning: Nullable<string>
}

export class Definition implements IDefinition {
  public id: Nullable<string>;
  public name: Nullable<string>;
  public meaning: Nullable<string>;

  constructor(model?: IDefinition) {
    this.id = model?.id;
    this.name = model?.name;
    this.meaning = model?.meaning;
  }
}

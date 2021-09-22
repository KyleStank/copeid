import { IEntity } from '@core/models/entity';

export interface IDefinition extends IEntity {
  name: string | undefined;
  meaning: string | undefined;
}

export class Definition implements IDefinition {
  public id: string | undefined;
  public name: string | undefined;
  public meaning: string | undefined;

  constructor(model?: Partial<IDefinition>) {
    this.id = model?.id;
    this.name = model?.name;
    this.meaning = model?.meaning;
  }
}

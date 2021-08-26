import { IEntity } from '@core/models/entity';

export interface IReference extends IEntity {
  content: string | undefined;
}

export class Reference implements IReference {
  public id: string | undefined;
  public content: string | undefined;

  constructor(model?: Partial<IReference>) {
    this.id = model?.id;
    this.content = model?.content;
  }
}

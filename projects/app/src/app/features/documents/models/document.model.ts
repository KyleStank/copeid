import { IEntity } from '@core/models/entity';

export interface IDocument extends IEntity {
  name: string | undefined;
  path: string | undefined;
  data: string | undefined;
}

export class Document implements IDocument {
  public id: string | undefined;
  public name: string | undefined;
  public path: string | undefined;
  public data: string | undefined;

  constructor(model?: Partial<IDocument>) {
    this.id = model?.id;
    this.name = model?.name;
    this.path = model?.path;
    this.data = model?.data;
  }
}

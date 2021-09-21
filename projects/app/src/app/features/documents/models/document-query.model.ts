import { IEntityQuery } from '@core/models/entity';

export interface IDocumentQuery extends IEntityQuery {
  name: string[] | undefined;
  path: string[] | undefined;
}

export class DocumentQuery implements IDocumentQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public name: string[] | undefined;
  public path: string[] | undefined;

  constructor(model?: Partial<IDocumentQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.name = model?.name;
    this.path = model?.path;
  }
}

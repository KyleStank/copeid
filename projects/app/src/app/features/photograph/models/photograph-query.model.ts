import { IEntityQuery } from '@core/models/entity';

export interface IPhotographQuery extends IEntityQuery {
  documentId: string[] | undefined;
  title: string[] | undefined;
  description: string[] | undefined;
}

export class PhotographQuery implements IPhotographQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public documentId: string[] | undefined;
  public title: string[] | undefined;
  public description: string[] | undefined;

  constructor(model?: Partial<IPhotographQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.documentId = model?.documentId;
    this.title = model?.title;
    this.description = model?.description;
  }
}

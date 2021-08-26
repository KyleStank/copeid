import { IEntityQuery } from '@core/models/entity';

export interface IReferenceQuery extends IEntityQuery {
  content: string[] | undefined;
}

export class ReferenceQuery implements IReferenceQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public content: string[] | undefined;

  constructor(model?: Partial<IReferenceQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.content = model?.content;
  }
}

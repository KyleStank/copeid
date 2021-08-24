import { IEntityQuery } from '@core';

export interface IReferenceQuery extends IEntityQuery {
  content: string[];
}

export class ReferenceQuery implements Partial<IReferenceQuery> {
  public id?: string[];
  public include?: string[];
  public orderBy?: string[];
  public orderByDescending?: string[];
  public content?: string[];

  constructor(model?: Partial<IReferenceQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.content = model?.content;
  }
}

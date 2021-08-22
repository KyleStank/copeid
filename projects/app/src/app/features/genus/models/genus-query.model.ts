import { IEntityQuery } from '@core';

export interface IGenusQuery extends IEntityQuery {
  photographId: string[];
  name: string[];
}

export class GenusQuery implements Partial<IGenusQuery> {
  public id?: string[];
  public include?: string[];
  public orderBy?: string[];
  public orderByDescending?: string[];
  public photographId?: string[];
  public name?: string[];

  constructor(model?: Partial<IGenusQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.photographId = model?.photographId;
    this.name = model?.name;
  }
}

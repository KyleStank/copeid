import { IEntityQuery } from '@core/models/entity';

export interface IGenusQuery extends IEntityQuery {
  photographId: string[] | undefined;
  name: string[] | undefined;
}

export class GenusQuery implements IGenusQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public photographId: string[] | undefined;
  public name: string[] | undefined;

  constructor(model?: Partial<IGenusQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.photographId = model?.photographId;
    this.name = model?.name;
  }
}

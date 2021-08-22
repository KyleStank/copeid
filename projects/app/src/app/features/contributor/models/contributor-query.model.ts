import { IEntityQuery } from '@core';

export interface IContributorQuery extends IEntityQuery {
  name: string[];
}

export class ContributorQuery implements IContributorQuery {
  public id: string[];
  public include: string[];
  public orderBy: string[];
  public orderByDescending: string[];
  public name: string[];

  constructor(model?: IContributorQuery) {
    this.id = model?.id as string[];
    this.include = model?.include as string[];
    this.orderBy = model?.orderBy as string[];
    this.orderByDescending = model?.orderByDescending as string[];
    this.name = model?.name as string[];
  }
}

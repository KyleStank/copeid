import { IEntityQuery } from '@core/models/entity';

export interface IContributorQuery extends IEntityQuery {
  name: string[] | undefined;
}

export class ContributorQuery implements IContributorQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public name: string[] | undefined;

  constructor(model?: Partial<IContributorQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.name = model?.name;
  }
}

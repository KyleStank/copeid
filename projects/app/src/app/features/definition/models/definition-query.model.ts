import { IEntityQuery } from '@core/models/entity';

export interface IDefinitionQuery extends IEntityQuery {
  name: string[] | undefined;
  meaning: string[] | undefined;
}

export class DefinitionQuery implements IDefinitionQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public name: string[] | undefined;
  public meaning: string[] | undefined;

  constructor(model?: Partial<IDefinitionQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.name = model?.name;
    this.meaning = model?.meaning;
  }
}

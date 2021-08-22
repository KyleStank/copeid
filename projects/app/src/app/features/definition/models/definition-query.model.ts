import { IEntityQuery } from '@core';

export interface IDefinitionQuery extends IEntityQuery {
  name: string[];
  meaning: string[];
}

export class DefinitionQuery implements Partial<IDefinitionQuery> {
  public id?: string[];
  public include?: string[];
  public orderBy?: string[];
  public orderByDescending?: string[];
  public name?: string[];
  public meaning?: string[];

  constructor(model?: Partial<IDefinitionQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.name = model?.name;
    this.meaning = model?.meaning;
  }
}

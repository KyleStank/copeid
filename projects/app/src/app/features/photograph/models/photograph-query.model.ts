import { IEntityQuery } from '@core';

export interface IPhotographQuery extends IEntityQuery {
  title: string[];
  description: string[];
  alt: string[];
  url: string[];
}

export class PhotographQuery implements Partial<IPhotographQuery> {
  public id?: string[];
  public include?: string[];
  public orderBy?: string[];
  public orderByDescending?: string[];
  public title?: string[];
  public description?: string[];
  public alt?: string[];
  public url?: string[];

  constructor(model?: Partial<IPhotographQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.title = model?.title;
    this.description = model?.description;
    this.alt = model?.alt;
    this.url = model?.url;
  }
}

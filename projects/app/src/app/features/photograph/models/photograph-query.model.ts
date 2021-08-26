import { IEntityQuery } from '@core/models/entity';

export interface IPhotographQuery extends IEntityQuery {
  title: string[] | undefined;
  description: string[] | undefined;
  alt: string[] | undefined;
  url: string[] | undefined;
}

export class PhotographQuery implements IPhotographQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public title: string[] | undefined;
  public description: string[] | undefined;
  public alt: string[] | undefined;
  public url: string[] | undefined;

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

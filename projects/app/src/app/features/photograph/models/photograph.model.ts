import { IEntity } from '@core/models/entity';

export interface IPhotograph extends IEntity {
  title: string | undefined;
  description: string | undefined;
  alt: string | undefined;
  url: string | undefined;
}

export class Photograph implements IPhotograph {
  public id: string | undefined;
  public title: string | undefined;
  public description: string | undefined;
  public alt: string | undefined;
  public url: string | undefined;

  constructor(model?: Partial<IPhotograph>) {
    this.id = model?.id;
    this.title = model?.title;
    this.description = model?.description;
    this.alt = model?.alt;
    this.url = model?.url;
  }
}

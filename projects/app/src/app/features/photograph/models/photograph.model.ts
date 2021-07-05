import { IEntity, Nullable } from '@core';

export interface IPhotograph extends IEntity {
  title: Nullable<string>;
  description: Nullable<string>;
  alt: Nullable<string>;
  url: Nullable<string>;
}

export class Photograph implements IPhotograph {
  public id: Nullable<string>;
  public title: Nullable<string>;
  public description: Nullable<string>;
  public alt: Nullable<string>;
  public url: Nullable<string>;

  constructor(model?: IPhotograph) {
    this.id = model?.id;
    this.title = model?.title;
    this.description = model?.description;
    this.alt = model?.alt;
    this.url = model?.url;
  }
}

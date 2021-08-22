import { IEntityQuery } from '@core';

import { SpecimenGender } from './specimen.model';

export interface ISpecimenQuery extends IEntityQuery {
  genusId: string[];
  photographId: string[];
  gender: SpecimenGender[];
  length: number[];
}

export class SpecimenQuery implements Partial<ISpecimenQuery> {
  public id?: string[];
  public include?: string[];
  public orderBy?: string[];
  public orderByDescending?: string[];
  public genusId?: string[];
  public photographId?: string[];
  public gender?: SpecimenGender[];
  public length?: number[];

  constructor(model?: Partial<ISpecimenQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.genusId = model?.genusId;
    this.photographId = model?.photographId;
    this.gender = model?.gender;
    this.length = model?.length;
  }
}

import { IEntityQuery } from '@core';

import { SpecimenGender } from './specimen.model';

export interface ISpecimenQuery extends IEntityQuery {
  genusId: string[];
  photographId: string[];
  gender: SpecimenGender[];
  length: number[];
  specialCharacteristics: string[];
  antenule: string[];
  rostrum: string[];
  bodyShape: string[];
  eyes: string[];
  cephalosome: string[];
  thorax: string[];
  urosome: string[];
  furca: string[];
  setea: string[];
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
  public specialCharacteristics?: string[];
  public antenule?: string[];
  public rostrum?: string[];
  public bodyShape?: string[];
  public eyes?: string[];
  public cephalosome?: string[];
  public thorax?: string[];
  public urosome?: string[];
  public furca?: string[];
  public setea?: string[];

  constructor(model?: Partial<ISpecimenQuery>) {
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.genusId = model?.genusId;
    this.photographId = model?.photographId;
    this.gender = model?.gender;
    this.length = model?.length;
    this.specialCharacteristics = model?.specialCharacteristics;
    this.antenule = model?.antenule;
    this.rostrum = model?.rostrum;
    this.bodyShape = model?.bodyShape;
    this.eyes = model?.eyes;
    this.cephalosome = model?.cephalosome;
    this.thorax = model?.thorax;
    this.urosome = model?.urosome;
    this.furca = model?.furca;
    this.setea = model?.setea;
  }
}

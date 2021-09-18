import { IEntityQuery } from '@core/models/entity';

import { SpecimenEyes } from './specimen-eyes.model';
import { SpecimenFurca } from './specimen-furca.model';
import { SpecimenGender } from './specimen-gender.model';
import { SpecimenSetea } from './specimen-setea.model';
import { SpecimenThoraxSegments } from './specimen-thorax-segments.model';
import { SpecimenThoraxShape } from './specimen-thorax-shape.model';

export interface ISpecimenQuery extends IEntityQuery {
  genusId: string[] | undefined;
  photographId: string[] | undefined;
  gender: SpecimenGender[] | undefined;
  length: number[] | undefined;
  specialCharacteristics: string[] | undefined;
  antenule: string[] | undefined;
  rostrum: string[] | undefined;
  bodyShape: string[] | undefined;
  eyes: SpecimenEyes[] | undefined;
  cephalosome: number[] | undefined;
  thorax: string[] | undefined;
  thoraxSegments: SpecimenThoraxSegments[] | undefined;
  thoraxShape: SpecimenThoraxShape[] | undefined;
  urosome: number[] | undefined;
  furca: SpecimenFurca[] | undefined;
  setea: SpecimenSetea[] | undefined;
}

export class SpecimenQuery implements ISpecimenQuery {
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public genusId: string[] | undefined;
  public photographId: string[] | undefined;
  public gender: SpecimenGender[] | undefined;
  public length: number[] | undefined;
  public specialCharacteristics: string[] | undefined;
  public antenule: string[] | undefined;
  public rostrum: string[] | undefined;
  public bodyShape: string[] | undefined;
  public eyes: SpecimenEyes[] | undefined;
  public cephalosome: number[] | undefined;
  public thorax: string[] | undefined;
  public thoraxSegments: SpecimenThoraxSegments[] | undefined;
  public thoraxShape: SpecimenThoraxShape[] | undefined;
  public urosome: number[] | undefined;
  public furca: SpecimenFurca[] | undefined;
  public setea: SpecimenSetea[] | undefined;

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
    this.thoraxSegments = model?.thoraxSegments;
    this.thoraxShape = model?.thoraxShape;
    this.urosome = model?.urosome;
    this.furca = model?.furca;
    this.setea = model?.setea;
  }
}

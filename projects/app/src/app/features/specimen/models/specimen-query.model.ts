import { IEntityQuery } from '@core/models/entity';

import { SpecimenEyes } from './specimen-eyes.model';
import { SpecimenFurca } from './specimen-furca.model';
import { SpecimenGender } from './specimen-gender.model';
import { SpecimenSetea } from './specimen-setea.model';
import { SpecimenThoraxSegments } from './specimen-thorax-segments.model';
import { SpecimenThoraxShape } from './specimen-thorax-shape.model';

export interface ISpecimenQuery extends IEntityQuery {
  // Basic Information
  genusId: string[] | undefined;
  photographId: string[] | undefined;
  gender: SpecimenGender[] | undefined;
  length: number[] | undefined;
  summary: string[] | undefined;
  specialCharacteristics: string[] | undefined;

  // Antenule
  antenule: string[] | undefined;

  // Rostrum
  rostrum: string[] | undefined;

  // Body Shape
  bodyShape: string[] | undefined;

  // Eyes
  eyes: SpecimenEyes[] | undefined;

  // Cephalosome
  cephalosome: number[] | undefined;

  // Thorax
  thorax: string[] | undefined;
  thoraxSegments: SpecimenThoraxSegments[] | undefined;
  thoraxShape: SpecimenThoraxShape[] | undefined;

  // Urosome
  urosome: number[] | undefined;

  // Furca
  furca: SpecimenFurca[] | undefined;

  // Setea
  setea: SpecimenSetea[] | undefined;
}

export class SpecimenQuery implements ISpecimenQuery {
  // Basic Information
  public id: string[] | undefined;
  public include: string[] | undefined;
  public orderBy: string[] | undefined;
  public orderByDescending: string[] | undefined;
  public genusId: string[] | undefined;
  public photographId: string[] | undefined;
  public gender: SpecimenGender[] | undefined;
  public length: number[] | undefined;
  public summary: string[] | undefined;
  public specialCharacteristics: string[] | undefined;

  // Antenule
  public antenule: string[] | undefined;

  // Rostrum
  public rostrum: string[] | undefined;

  // Body Shape
  public bodyShape: string[] | undefined;

  // Eyes
  public eyes: SpecimenEyes[] | undefined;

  // Cephalosome
  public cephalosome: number[] | undefined;

  // Thorax
  public thorax: string[] | undefined;
  public thoraxSegments: SpecimenThoraxSegments[] | undefined;
  public thoraxShape: SpecimenThoraxShape[] | undefined;

  // Urosome
  public urosome: number[] | undefined;

  // Furca
  public furca: SpecimenFurca[] | undefined;

  // Setea
  public setea: SpecimenSetea[] | undefined;

  constructor(model?: Partial<ISpecimenQuery>) {
    // Basic Information
    this.id = model?.id;
    this.include = model?.include;
    this.orderBy = model?.orderBy;
    this.orderByDescending = model?.orderByDescending;
    this.genusId = model?.genusId;
    this.photographId = model?.photographId;
    this.gender = model?.gender;
    this.length = model?.length;
    this.summary = model?.summary;
    this.specialCharacteristics = model?.specialCharacteristics;

    // Antenule
    this.antenule = model?.antenule;

    // Rostrum
    this.rostrum = model?.rostrum;

    // Body Shape
    this.bodyShape = model?.bodyShape;

    // Eyes
    this.eyes = model?.eyes;

    // Cephalosome
    this.cephalosome = model?.cephalosome;

    // Thorax
    this.thorax = model?.thorax;
    this.thoraxSegments = model?.thoraxSegments;
    this.thoraxShape = model?.thoraxShape;

    // Urosome
    this.urosome = model?.urosome;

    // Furca
    this.furca = model?.furca;

    // Setea
    this.setea = model?.setea;
  }
}

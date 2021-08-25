export interface IFilterData {
  length: number;
  eyes: string;
  cephalosome: string;
  thoraxSegments: string;
  thoraxShape: string;
  urosome: string;
  furca: string;
  setea: string;
}

export class FilterData implements IFilterData {
  public length: number;
  public eyes: string;
  public cephalosome: string;
  public thoraxSegments: string;
  public thoraxShape: string;
  public urosome: string;
  public furca: string;
  public setea: string;

  constructor(model: IFilterData) {
    this.length = model.length;
    this.eyes = model.eyes;
    this.cephalosome = model.cephalosome;
    this.thoraxSegments = model.thoraxSegments;
    this.thoraxShape = model.thoraxShape;
    this.urosome = model.urosome;
    this.furca = model.furca;
    this.setea = model.setea;
  }
}

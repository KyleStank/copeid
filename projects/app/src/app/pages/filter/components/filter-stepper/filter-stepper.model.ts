export class FilterStepperResult {
  filterSectionId: string | undefined;
  filterSectionPartId: string | undefined;
  filterSectionPartOptionId: string | undefined;

  constructor(model?: Partial<FilterStepperResult>) {
    this.filterSectionId = model?.filterSectionId;
    this.filterSectionPartId = model?.filterSectionPartId;
    this.filterSectionPartOptionId = model?.filterSectionPartOptionId;
  }
}

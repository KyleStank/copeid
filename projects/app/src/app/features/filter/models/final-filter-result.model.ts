export class FinalFilterResult {
  filteredIds: string[];
  formattedCode: string;

  constructor(filteredIds: string[], formattedCode: string) {
    this.filteredIds = filteredIds;
    this.formattedCode = formattedCode;
  }
}

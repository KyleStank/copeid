export class FinalFilterResult<TResult = Object> {
  filteredResults: TResult[];
  formattedCode: string;

  constructor(filteredResults: TResult[], formattedCode: string) {
    this.filteredResults = filteredResults;
    this.formattedCode = formattedCode;
  }
}

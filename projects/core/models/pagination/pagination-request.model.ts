export class PaginationRequest {
  pageNumber: number;
  pageSize: number;

  constructor(pageNumber: number, pageSize: number) {
    this.pageNumber = Math.max(1, pageNumber);
    this.pageSize = pageSize;
  }
}

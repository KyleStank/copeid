export interface IDocumentMimeType {
  mimeType: string | undefined;
}

export class DocumentMimeType implements IDocumentMimeType {
  mimeType: string | undefined;

  constructor(mimeType: string | undefined) {
    this.mimeType = mimeType;
  }
}

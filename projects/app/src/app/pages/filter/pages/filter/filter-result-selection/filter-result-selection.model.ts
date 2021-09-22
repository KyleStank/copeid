import { KeyValue } from '@angular/common';
import { IEntity } from '@core/models/entity';

export interface IFilterResultSelectionModalData {
  results?: IEntity[];
  displayProperty?: string;
  infoProperties?: KeyValue<string, string>[];
}

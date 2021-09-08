import { Subject } from 'rxjs';

export interface IAdminView {
  destroyed: Subject<void>;
}

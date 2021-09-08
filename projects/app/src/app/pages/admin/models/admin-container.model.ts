import { Subject } from 'rxjs';

import { IAdminView } from './admin-view.model';

export interface IAdminContainer<TAdminView extends IAdminView = IAdminView> {
  destroyed: Subject<void>;

  activeView: TAdminView | undefined;

  activateView: (viewComponent: TAdminView | undefined) => void;
  deactivateView: (viewComponent: TAdminView | undefined) => void;
}

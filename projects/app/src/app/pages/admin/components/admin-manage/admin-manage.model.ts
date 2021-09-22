import { IAdminContainer, IAdminView } from '../../models';

export interface IAdminManageView extends IAdminView {
  selectedItems: any[];

  editAddItem: (model?: any) => void;
  deleteItems: (models?: any[]) => void;
}

export interface IAdminManageContainer extends IAdminContainer<IAdminManageView> {
  editAddItem: (model?: any) => void;
  deleteSelectedItems: () => void;
}

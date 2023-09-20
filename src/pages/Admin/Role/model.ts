// @ts-ignore
import { RoleToMenu } from '@/pages/Admin/Role/components/RoleForm/components/RoleToMenuList/data';
import { RoleItem } from '@/pages/Admin/Role/data';
import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';

export interface RoleModalState {
  RoleList?: {
    reload?: () => void;
  };
  RoleForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: RoleItem;
  };
  MenuList?: {
    reload?: () => void;
  };
  MenuForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: RoleToMenu;
  };
}

export interface RoleModelType {
  namespace: string;
  state: RoleModalState;
  reducers: {
    updateRoleForm: Reducer<RoleModalState>;
    updateRoleList: Reducer<RoleModalState>;
    updateMenuForm: Reducer<RoleModalState>;
    updateMenuList: Reducer<RoleModalState>;
  };
}

const RoleModel: RoleModelType = {
  namespace: 'role',
  state: {
    RoleList: {
      reload: undefined,
    },
    RoleForm: {
      type: undefined,
      itemEdit: undefined,
    },
    MenuList: {
      reload: undefined,
    },
    MenuForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateRoleForm(state, action) {
      const RoleForm = state?.RoleForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        RoleForm[k] = fields[k];
      });
      return { ...state, RoleForm };
    },
    updateRoleList(state, action) {
      const RoleList = state?.RoleList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        RoleList[k] = fields[k];
      });
      return { ...state, RoleList };
    },
    updateMenuForm(state, action) {
      const MenuForm = state?.MenuForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        MenuForm[k] = fields[k];
      });
      return { ...state, MenuForm };
    },
    updateMenuList(state, action) {
      const MenuList = state?.MenuList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        MenuList[k] = fields[k];
      });
      return { ...state, MenuList };
    },
  },
};

export default RoleModel;

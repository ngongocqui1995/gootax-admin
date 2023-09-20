// @ts-ignore
import { UserItem } from '@/pages/Admin/User/data';
import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';

export interface UserModalState {
  UserList?: {
    reload?: () => void;
  };
  UserForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: UserItem;
  };
}

export interface UserModelType {
  namespace: string;
  state: UserModalState;
  reducers: {
    updateUserForm: Reducer<UserModalState>;
    updateUserList: Reducer<UserModalState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    UserList: {
      reload: undefined,
    },
    UserForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateUserForm(state, action) {
      const UserForm = state?.UserForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        UserForm[k] = fields[k];
      });
      return { ...state, UserForm };
    },
    updateUserList(state, action) {
      const UserList = state?.UserList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        UserList[k] = fields[k];
      });
      return { ...state, UserList };
    },
  },
};

export default UserModel;

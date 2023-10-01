import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';
import { WardItem } from './data';

export interface WardModalState {
  WardList?: {
    reload?: () => void;
  };
  WardForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: WardItem;
  };
}

export interface WardModelType {
  namespace: string;
  state: WardModalState;
  reducers: {
    updateWardForm: Reducer<WardModalState>;
    updateWardList: Reducer<WardModalState>;
  };
}

const WardModel: WardModelType = {
  namespace: 'ward',
  state: {
    WardList: {
      reload: undefined,
    },
    WardForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateWardForm(state, action) {
      const WardForm = state?.WardForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        WardForm[k] = fields[k];
      });
      return { ...state, WardForm };
    },
    updateWardList(state, action) {
      const WardList = state?.WardList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        WardList[k] = fields[k];
      });
      return { ...state, WardList };
    },
  },
};

export default WardModel;

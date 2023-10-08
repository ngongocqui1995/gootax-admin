import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';
import { ProvinceItem } from './data';

export interface ProvinceModalState {
  ProvinceList?: {
    reload?: () => void;
  };
  ProvinceForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: ProvinceItem;
  };
}

export interface ProvinceModelType {
  namespace: string;
  state: ProvinceModalState;
  reducers: {
    updateProvinceForm: Reducer<ProvinceModalState>;
    updateProvinceList: Reducer<ProvinceModalState>;
  };
}

const ProvinceModel: ProvinceModelType = {
  namespace: 'province',
  state: {
    ProvinceList: {
      reload: undefined,
    },
    ProvinceForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateProvinceForm(state, action) {
      const ProvinceForm = state?.ProvinceForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        ProvinceForm[k] = fields[k];
      });
      return { ...state, ProvinceForm };
    },
    updateProvinceList(state, action) {
      const ProvinceList = state?.ProvinceList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        ProvinceList[k] = fields[k];
      });
      return { ...state, ProvinceList };
    },
  },
};

export default ProvinceModel;

import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';
import { DistrictItem } from './data';

export interface DistrictModalState {
  DistrictList?: {
    reload?: () => void;
  };
  DistrictForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: DistrictItem;
  };
}

export interface DistrictModelType {
  namespace: string;
  state: DistrictModalState;
  reducers: {
    updateDistrictForm: Reducer<DistrictModalState>;
    updateDistrictList: Reducer<DistrictModalState>;
  };
}

const DistrictModel: DistrictModelType = {
  namespace: 'district',
  state: {
    DistrictList: {
      reload: undefined,
    },
    DistrictForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateDistrictForm(state, action) {
      const DistrictForm = state?.DistrictForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        DistrictForm[k] = fields[k];
      });
      return { ...state, DistrictForm };
    },
    updateDistrictList(state, action) {
      const DistrictList = state?.DistrictList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        DistrictList[k] = fields[k];
      });
      return { ...state, DistrictList };
    },
  },
};

export default DistrictModel;

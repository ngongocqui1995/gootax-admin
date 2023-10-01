import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';
import { DriverItem } from './data';

export interface DriverModalState {
  DriverList?: {
    reload?: () => void;
  };
  DriverForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: DriverItem;
  };
}

export interface DriverModelType {
  namespace: string;
  state: DriverModalState;
  reducers: {
    updateDriverForm: Reducer<DriverModalState>;
    updateDriverList: Reducer<DriverModalState>;
  };
}

const DriverModel: DriverModelType = {
  namespace: 'driver',
  state: {
    DriverList: {
      reload: undefined,
    },
    DriverForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateDriverForm(state, action) {
      const DriverForm = state?.DriverForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        DriverForm[k] = fields[k];
      });
      return { ...state, DriverForm };
    },
    updateDriverList(state, action) {
      const DriverList = state?.DriverList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        DriverList[k] = fields[k];
      });
      return { ...state, DriverList };
    },
  },
};

export default DriverModel;

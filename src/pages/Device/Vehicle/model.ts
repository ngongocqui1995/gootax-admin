import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';
import { VehicleItem } from './data';

export interface VehicleModalState {
  VehicleList?: {
    reload?: () => void;
  };
  VehicleForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: VehicleItem;
  };
}

export interface VehicleModelType {
  namespace: string;
  state: VehicleModalState;
  reducers: {
    updateVehicleForm: Reducer<VehicleModalState>;
    updateVehicleList: Reducer<VehicleModalState>;
  };
}

const VehicleModel: VehicleModelType = {
  namespace: 'vehicle',
  state: {
    VehicleList: {
      reload: undefined,
    },
    VehicleForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateVehicleForm(state, action) {
      const VehicleForm = state?.VehicleForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        VehicleForm[k] = fields[k];
      });
      return { ...state, VehicleForm };
    },
    updateVehicleList(state, action) {
      const VehicleList = state?.VehicleList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        VehicleList[k] = fields[k];
      });
      return { ...state, VehicleList };
    },
  },
};

export default VehicleModel;

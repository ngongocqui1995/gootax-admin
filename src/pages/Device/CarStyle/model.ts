import { I_TYPE_FORM } from '@/utils/interface';
import { Reducer } from '@umijs/max';
import { CarStyleItem } from './data';

export interface CarStyleModalState {
  CarStyleList?: {
    reload?: () => void;
  };
  CarStyleForm?: {
    type?: I_TYPE_FORM;
    itemEdit?: CarStyleItem;
  };
}

export interface CarStyleModelType {
  namespace: string;
  state: CarStyleModalState;
  reducers: {
    updateCarStyleForm: Reducer<CarStyleModalState>;
    updateCarStyleList: Reducer<CarStyleModalState>;
  };
}

const CarStyleModel: CarStyleModelType = {
  namespace: 'car_style',
  state: {
    CarStyleList: {
      reload: undefined,
    },
    CarStyleForm: {
      type: undefined,
      itemEdit: undefined,
    },
  },

  reducers: {
    updateCarStyleForm(state, action) {
      const CarStyleForm = state?.CarStyleForm || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CarStyleForm[k] = fields[k];
      });
      return { ...state, CarStyleForm };
    },
    updateCarStyleList(state, action) {
      const CarStyleList = state?.CarStyleList || {};
      const fields = action.payload;
      Object.keys(fields).forEach((k) => {
        CarStyleList[k] = fields[k];
      });
      return { ...state, CarStyleList };
    },
  },
};

export default CarStyleModel;
